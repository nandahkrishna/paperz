"use server";

export type GetNotesParams = {
  invitation?: string;
};

export type Note = {
  content: {
    title: {
      value: string;
    };
    authors?: {
      value: string[];
    };
    abstract?: {
      value: string;
    };
    pdf?: {
      value: string;
    };
    paperhash: string;
    venue?: string;
    venueid?: string;
  };
  id: string;
};

export async function getNotes(params: GetNotesParams) {
  const url = `https://api2.openreview.net/notes?${new URLSearchParams(
    params
  )}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {},
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data["notes"] as Note[];
}
