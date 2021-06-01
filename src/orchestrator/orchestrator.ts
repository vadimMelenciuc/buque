import { ModuleObserver } from './bus';
import { ModuleAction } from './models';
import { ModuleEvents, appKey } from './events';
import { Container } from './container-abstract';

export class Orchestrator<T> extends ModuleObserver {
  private bindTypeContainer = new Map();
  private shippedContainersLabel = new Map();
  private shippedContainers = new Set<any>();
  private logger = console;

  constructor(id: string = 'Orchestrator') {
    super(id);
  }

  public async notification(event: string, emitter: string, action: ModuleAction) {
    this.logger.info({ msg: `${emitter}: ${action.message}` });
    switch (event) {
      case `${appKey}.${ModuleEvents.closeAll}`:
        await this.closeShipping();
        break;
      default:
        this.logger.debug({
          message: `the event ${event} by the ${emitter} is emitted and there is no action to handle it`,
        });
        break;
    }
  }

  public labelContainer(map: T) {
    for (const [label, container] of Object.entries(map)) {
      this.bindTypeContainer.set(label, container);
    }
  }

  public async shipContainers() {
    for (const [type, container] of this.bindTypeContainer) {
      if (!this.shippedContainersLabel.get(type)) {
        try {
          await this.prepareContainer(type, container);
          this.logger.info({
            msg: `shipped container: ${container.id || container.name}`,
          });
        } catch (error) {
          this.logger.error({
            error: `can't ship container: ${container.id || container.name}`,
            stck: error,
          });
        }
      }
    }
  }

  private async prepareContainer(type: string, container: any) {
    const iContainer = new container();
    if (iContainer.dependencyTypes) {
      const start = iContainer.start(await this.constructDep(iContainer.dependencyTypes));
      if (start instanceof Promise) {
        await start;
      }
    } else {
      if (iContainer.start) {
        const start = iContainer.start();
        if (start instanceof Promise) {
          await start;
        }
      }
    }
    this.shippedContainers.add(iContainer);
    this.shippedContainersLabel.set(type, iContainer);
  }

  private async constructDep(dependencies: string[]) {
    const injectedDependencies: {
      [key: string]: Container<any, any>;
    } = {};
    for (const dependency of dependencies) {
      if (!this.shippedContainersLabel.get(dependency)) {
        await this.prepareContainer(dependency, this.bindTypeContainer.get(dependency));
      }
      injectedDependencies[dependency] = this.shippedContainersLabel.get(dependency);
    }
    return injectedDependencies;
  }

  public async closeShipping() {
    for (const container of this.shippedContainers) {
      if (container.close) {
        try {
          const close = container.close();
          if (close instanceof Promise) {
            await close;
          }
          this.logger.info({
            msg: `closed container: ${container.id || container.name}`,
          });
        } catch (error) {
          this.logger.error({
            error: `can't close container: ${container.id || container.name}`,
            stck: error,
          });
        }
      } else {
        this.logger.info({
          msg: `no close policy at container: ${container.id || container.name}`,
        });
      }
    }
  }

  public findContainer(label: string) {
    if (this.shippedContainersLabel.get(label)) {
      return this.shippedContainersLabel.get(label);
    } else {
      throw new Error(`Container ${label} is not ready yet`);
    }
  }
}
