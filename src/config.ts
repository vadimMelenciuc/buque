interface IConfig {
    logger: IConfigLogger;
}

interface IConfigLogger {
    active: boolean;
}

export const Config: IConfig = {
    logger: { active: false}
}