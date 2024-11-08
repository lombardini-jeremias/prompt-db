import Prompt from "../../../../../models/prompt";
import { connectToDB } from "../../../../../utils/database";

export const GET = async (request, { params }) => {
  const { id } = await params;
  console.log("GET-PROMPT", id);
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: id }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};