"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass = "min-h-11 border-input bg-white text-base text-ink";

/** Sends messages through Web3Forms, which works without a server of our own. */
export function ContactForm({ accessKey }: { accessKey: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-rule bg-white p-6">
        <p className="text-lg font-semibold">Message sent.</p>
        <p className="mt-1 text-ink-soft">Thank you. We reply to every message, usually within a few days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-[34rem] gap-5">
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value="New message from the foundation website" />
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-2">
        <Label htmlFor="name" className="text-base">
          Your name
        </Label>
        <Input id="name" name="name" autoComplete="name" required className={fieldClass} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-base">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          required
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="topic" className="text-base">
          What is it about?
        </Label>
        <select
          id="topic"
          name="topic"
          className={`${fieldClass} rounded-md border px-3`}
          defaultValue="A question about donating"
        >
          <option>A question about donating</option>
          <option>Volunteering</option>
          <option>Suggesting a family or school to help</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message" className="text-base">
          Message
        </Label>
        <Textarea id="message" name="message" rows={6} required className={fieldClass} />
      </div>

      {status === "error" && (
        <p role="alert" className="text-redpen">
          Your message was not sent. Check your connection and try again, or email us instead.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-11 items-center justify-center justify-self-start rounded-md bg-redpen px-7 text-lg font-semibold text-white transition-colors hover:bg-redpen-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
