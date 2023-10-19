import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import NLPCloudClient from "nlpcloud";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { instruction } = body;
    if (!instruction) {
      return new NextResponse("Instruction is required", { status: 400 });
    }

    const client = new NLPCloudClient({
      model: "finetuned-llama-2-70b",
      token: process.env.NLP_CLOUD_API_KEY as string,
      gpu: true,
    });
    const response = await client.codeGeneration({
      instruction,
    });

    return NextResponse.json(response?.data);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
