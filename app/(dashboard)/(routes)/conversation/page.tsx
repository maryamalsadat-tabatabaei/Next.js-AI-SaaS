"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { UserAvatar } from "@/components/user-avatar";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/empty";
import { BotAvatar } from "@/components/bot-avatar";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

function ConversationPage() {
  const router = useRouter();
  const [historyMessages, setHistoryMessages] = useState<
    { input: string; response: string }[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/conversation", {
        history: historyMessages,
        input: values.prompt as string,
      });

      setHistoryMessages(
        (current) =>
          [
            ...current,
            { input: values.prompt, response: response.data.response },
          ] as any
      );

      form.reset();
    } catch (error) {
      console.log("error", error);
    } finally {
      router.refresh();
    }
  };
  return (
    <>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="How do I calculate the radius of a circle?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="bg-violet-500 hover:bg-violet-600 col-span-12 lg:col-span-2 w-full"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {!historyMessages && !isLoading && (
          <Empty label="No conversation started." />
        )}
        <div className="flex flex-col-reverse gap-y-4 p-4">
          {historyMessages?.map((message) => (
            <Fragment key={message.input}>
              <div className="p-8 w-full flex items-start gap-x-8 rounded-lg bg-white border border-black/10">
                <UserAvatar />
                <p className="text-sm">{message.input}</p>
              </div>
              <div className="p-8 w-full flex items-start gap-x-8 rounded-lg bg-muted">
                <BotAvatar />
                <p className="text-sm">{message.response}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default ConversationPage;
