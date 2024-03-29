[![DeepScan grade](https://deepscan.io/api/teams/18296/projects/21623/branches/626411/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=18296&pid=21623&bid=626411)
# buque
Dependency injection container

## Usage example

```ts
import { Buque } from './index';

type ContainerMap = { Queen; King };
const orchestrator = new Buque.Register<ContainerMap>('Mozart');

class Queen extends Buque.Container<ContainerMap, ['Jack']> {
  constructor() {
    super('queen-id');
  }
  start() {
    console.log('ok');
  }
}

class Jacks extends Buque.Container<ContainerMap, []> {
  constructor() {
    super('queen-id');
  }
  start() {
    console.log('ok');
  }
}

class King extends Buque.Container<ContainerMap, ['Queen']> {
  constructor() {
    super('king-id', ['Queen']);
  }
  start(dependencies: { Queen: Queen }) {
    console.log('kingStart');
  }
}

const containerMap = { Queen, King };
orchestrator.labelContainer(containerMap);

(async function () {
  await orchestrator.shipContainers();
  console.log('done');
})();

```
