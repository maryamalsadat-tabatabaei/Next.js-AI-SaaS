import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import NLPCloudClient from "nlpcloud";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // if (!openai.apiKey) {
    //   return new NextResponse("OpenAI API Key not configured.", {
    //     status: 500,
    //   });
    // }

    const body = await req.json();
    const { history, input } = body;
    if (!input) {
      return new NextResponse("Input is required", { status: 400 });
    }
    if (!history) {
      return new NextResponse("History is required", { status: 400 });
    }

    // const chatCompletion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages,
    // });

    // return NextResponse.json(chatCompletion.choices[0].message);
    const client = new NLPCloudClient({
      model: "finetuned-llama-2-70b",
      token: process.env.NLP_CLOUD_API_KEY as string,
      gpu: true,
    });
    const response = await client.chatbot({
      input,
      context: "",
      history,
    });

    return NextResponse.json(response?.data);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
