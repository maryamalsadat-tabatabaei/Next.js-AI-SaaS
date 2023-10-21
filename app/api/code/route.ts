import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import NLPCloudClient from "nlpcloud";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

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

    const freeTrial = await checkApiLimit();
    const isPremium = await checkSubscription();

    if (!freeTrial && !isPremium) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }

    const client = new NLPCloudClient({
      model: "finetuned-llama-2-70b",
      token: process.env.NLP_CLOUD_API_KEY as string,
      gpu: true,
    });
    const response = await client.codeGeneration({
      instruction,
    });

    if (!isPremium) {
      await incrementApiLimit();
    }

    return NextResponse.json(response?.data);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
