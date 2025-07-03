import { getKnexIntance } from '../src/common/infrastructure/knexConnection';
import { testing } from '../src/config/database/Knexfile';

export const knexConfig = getKnexIntance(testing)