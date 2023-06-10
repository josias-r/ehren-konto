import yup from "yup";
import createHttpError from "http-errors";

async function parseAndValidateJSONBody<
  TYupSchema extends yup.ObjectSchema<any, any, any>
>(request: Request, schema: TYupSchema, cast = true) {
  try {
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const body = await request.json();

      try {
        if (cast) {
          const castedBody = schema.cast(body);
          return castedBody;
        }
        const parsedBody = await schema.validate(body);
        return parsedBody;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          throw new createHttpError.BadRequest("invalid-body-json-schema");
        }
        throw new createHttpError.BadRequest("invalid-body-json-schema");
      }
    }

    throw new createHttpError.BadRequest("invalid-content-type");
  } catch (error) {
    throw new createHttpError.BadRequest("invalid-body-json");
  }
}

export default parseAndValidateJSONBody;
