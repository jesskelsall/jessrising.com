import { FormEventHandler, useRef, useState } from "react";

export const Newsletter = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);

  const subscribeUser: FormEventHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    if (!email) return;

    const { status } = await fetch("/api/subscribeNewsletter", {
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    setSubmitted(true);
    setSubmitError(status !== 200);
  };

  return (
    <footer className="content-area blog block newsletter">
      {!submitted && (
        <>
          <h2>Want to see more content like this?</h2>
          <p>
            Why not sign up for my newsletter!
            <br />
            Once per month I&apos;ll email you about my latest blog posts and
            photos. There&apos;ll be no spam or ads, just content.
          </p>
          <form onSubmit={subscribeUser}>
            <input
              className="input"
              type="email"
              placeholder="Email address"
              ref={emailRef}
            />
            <button className="button" type="submit">
              Subscribe
            </button>
          </form>
        </>
      )}
      {submitted &&
        (submitError ? (
          <>
            <h2>Oops! Something went wrong.</h2>
            <p>
              That wasn&apos;t supposed to happen. Email me at
              hi@jesskelsall.dev and I&apos;ll add you manually instead.
            </p>
          </>
        ) : (
          <>
            <h2>Nearly there!</h2>
            <p>
              Thanks for subscribing! Check your inbox for a confirmation email
              to finish the sign-up process.
            </p>
          </>
        ))}
    </footer>
  );
};
