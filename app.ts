enum Tags {
  Polular = "popular",
  New = "new",
}

enum Status {
  Published = "published",
}

interface Answer {
  question: string;
  answer: string;
  tags: Tags[];
  likes: number;
  status: Status;
}

async function getFaqs(req: {
  topicId: number;
  status?: Status;
}): Promise<Answer[]> {
  const res = await fetch("/faqs", {
    method: "POST",
    body: JSON.stringify(req),
  });

  return [
    {
      question: "123",
      answer: "",
      //   tags: Tags[],
      likes: 1,
      status: Status.Published,
    },
  ];

  const data = await res.json();
  return data;
}
