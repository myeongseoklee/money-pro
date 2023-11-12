import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('local', 'dev', 'production').required(),
  PORT: Joi.number().required(),
  CORS_ORIGIN:
    process.env.NODE_ENV === 'production'
      ? Joi.string().uri().required()
      : Joi.string(),
  MYSQL_PORT: Joi.number().required(),
  MYSQL_USERNAME: Joi.string().required(),
  MYSQL_HOST: Joi.string().required(),
  MYSQL_ROOT_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  SWAGGER_USER: Joi.string().optional(),
  SWAGGER_PASSWORD: Joi.string().optional(),
});
