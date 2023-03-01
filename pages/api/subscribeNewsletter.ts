import Joi from "joi";
import { NextApiHandler } from "next";

const { MAILCHIMP_AUDIENCE_ID, MAILCHIMP_API_KEY } = process.env;

interface IBody {
  email: string;
}

const bodySchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

// Asserts body shape using Joi and casts to TypeScript type
// If invalid schema, throws error
const validateBody = <Body>(body: unknown, schema: Joi.AnySchema): Body => {
  Joi.assert(body, schema);
  return body as Body;
};

const subscribeNewsletterHandler: NextApiHandler = async (req, res) => {
  try {
    const { email } = validateBody<IBody>(req.body, bodySchema);
    const response = await fetch(
      `https://us21.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        body: JSON.stringify({
          email_address: email,
          status: "pending",
        }),
        headers: {
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    res.status(200).json({ success: response.status === 200 });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

export default subscribeNewsletterHandler;
