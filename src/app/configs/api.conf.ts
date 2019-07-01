import { Configuration, ConfigurationParameters } from 'app/core/http';
import { environment } from 'environments/environment';

export function apiConfigFactory(): Configuration {
    const params: ConfigurationParameters = {
        basePath: environment.apiBasePath
    };
    return new Configuration(params);
}
