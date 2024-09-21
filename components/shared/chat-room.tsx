"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { messageSchema, MessageSchema } from "@/schema/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { CircleIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { messageAtom } from "@/atoms";
import { cn } from "@/lib/utils";
import axios from "axios";

const ChatRoom = () => {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useAtom(messageAtom);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  async function handleSubmit(values: MessageSchema) {
    setLoading(true);

    const userMessage: Message = {
      message: values.message,
      type: "HUMAN",
    };

    setMessages((prev) => [...prev, userMessage]);
    try {
      const data = await axios.post(
        "https://floqer-backend-ubn6.onrender.com/api/v1/model",
        values
      );
      const aiMessage: Message = {
        message: data.data.Value,
        type: "AI",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
    form.reset();
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent new line
      form.handleSubmit(handleSubmit)(); // Trigger form submission
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="p-6 border-x-2 border-x-primary bg-gradient-to-r from-rose-700 via-pink-950 to-black rounded-full gap-x-2"
        >
          <MessageCircle className="h-5 w-5" />
          <p>Wanna know more?</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black rounded-none border-pink-950">
        <DialogHeader>
          <DialogTitle className="text-2xl">Have a doubt?</DialogTitle>
          <DialogDescription className="text-md">
            Ask your questions to our AI model about anything and get them
            answered fast. <br />
            LLM powered by{" "}
            <Link
              href="https://gemini.google.com/app?hl=en-IN"
              className="text-rose-800"
            >
              Gemini AI.
            </Link>
            <br />
            <p className="text-sm font-bold opacity-45 mt-1">
              Please be patient. Our AI takes some time.
            </p>
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="h-[78vh]">
          <div className="h-full">
            <div className="h-[85%] bg-neutral-700/20 overflow-y-scroll p-2">
              {messages.map((message,indx) => (
                <div
                  key={indx}
                  className={cn(
                    "flex my-2", // Flex container for alignment
                    message.type === "AI" ? "justify-start" : "justify-end"
                  )}
                >
                  <div
                    className={cn(
                      "p-3 inline-block rounded-xl max-w-[75%] shadow-lg", // Max width for better responsiveness
                      message.type === "AI"
                        ? "bg-rose-900 rounded-bl-none"
                        : "bg-neutral-800 rounded-br-none"
                    )}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex my-2 justify-start p-2 bg-rose-800 w-3/4 rounded-xl rounded-bl-none">
                  <div className="flex items-center space-x-3">
                    <CircleIcon className="animate-pulse h-8 w-8" />
                    <p>Thinking</p>
                  </div>
                </div>
              )}
            </div>
            <div className="h-[15%]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className=" space-y-1 my-2"
                >
                  <div className="w-full h-full">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Textarea
                              className="w-full text-lg rounded-none"
                              placeholder="Why are the salaries so high?"
                              onKeyDown={handleKeyDown}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    className="w-full text-lg space-x-2 flex items-center rounded-none bg-rose-800 text-primary hover:bg-rose-950 transition duration-200 ease-linear"
                  >
                    <p>Send</p>
                    <PaperPlaneIcon className="h-5 w-5" />
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatRoom;
