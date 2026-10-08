"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { profile } from "@/lib/content";
const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Enter a valid email address.").max(254),
  message: z
    .string()
    .trim()
    .min(10, "Please add at least 10 characters.")
    .max(3000, "Please keep your message under 3,000 characters."),
});
type ContactValues = z.infer<typeof schema>;
export default function ContactDraftForm() {
  const [draft, setDraft] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const form = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });
  function prepare(values: ContactValues) {
    setDraft(
      `mailto:${profile.email}?subject=${encodeURIComponent(`Let's connect: ${values.name}`)}&body=${encodeURIComponent(`Hi Tritam,\n\n${values.message}\n\n${values.name}\n${values.email}`)}`,
    );
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(prepare)}
          onChange={() => setDraft(null)}
          className="space-y-5"
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your message</FormLabel>
                <FormControl>
                  <Textarea rows={4} maxLength={3000} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Prepare email draft <Mail />
          </Button>
        </form>
      </Form>
      {draft && (
        <m.div
          initial={reduced ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Alert role="status">
            <Check />
            <AlertDescription>
              <p>Your draft is ready. You can review and send it in your email app.</p>
              <Button asChild className="mt-3">
                <a href={draft}>
                  Open email app
                  <ArrowUpRight />
                </a>
              </Button>
            </AlertDescription>
          </Alert>
        </m.div>
      )}
    </>
  );
}
