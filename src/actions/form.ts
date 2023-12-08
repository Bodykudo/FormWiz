'use server';

import { auth } from '@clerk/nextjs';
import prismadb from '@/src/lib/prismadb';
import { formSchema, formSchemaType } from '@/src/types/form';

class UserNotFoundError extends Error {}

export async function GetFormStats() {
  const { userId } = auth();

  if (!userId) {
    throw new UserNotFoundError();
  }

  const stats = await prismadb.form.aggregate({
    where: {
      userId,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
  const bounceRate = 100 - submissionRate;

  return { visits, submissions, submissionRate, bounceRate };
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error('Form not valid');
  }

  const { userId } = auth();

  if (!userId) {
    throw new UserNotFoundError();
  }

  const { name, description } = data;

  const form = await prismadb.form.create({
    data: {
      userId,
      name,
      description,
    },
  });

  if (!form) {
    throw new Error('Something went wrong');
  }

  return form;
}

export async function GetForms() {
  const { userId } = auth();

  if (!userId) {
    throw new UserNotFoundError();
  }

  const forms = await prismadb.form.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return forms;
}

export async function GetFormById(id: number) {
  const { userId } = auth();

  if (!userId) {
    throw new UserNotFoundError();
  }

  const form = await prismadb.form.findFirst({
    where: {
      id,
      userId,
    },
  });

  return form;
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  const { userId } = auth();

  if (!userId) {
    throw new UserNotFoundError();
  }

  const form = await prismadb.form.update({
    where: {
      id,
      userId,
    },
    data: {
      content: jsonContent,
    },
  });

  return form;
}

export async function PublishForm(id: number) {
  const { userId } = auth();

  if (!userId) {
    throw new UserNotFoundError();
  }

  const form = await prismadb.form.update({
    where: {
      id,
      userId,
    },
    data: {
      published: true,
    },
  });

  return form;
}

export async function GetFormContentByURL(url: string) {
  const { userId } = auth();

  if (!userId) {
    throw new UserNotFoundError();
  }

  const form = await prismadb.form.update({
    where: {
      shareURL: url,
    },
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  });

  return form;
}

export async function SubmitForm(url: string, content: string) {
  const form = await prismadb.form.update({
    where: {
      shareURL: url,
      published: true,
    },
    data: {
      submissions: {
        increment: 1,
      },
      formSubmissions: {
        create: {
          content,
        },
      },
    },
  });

  return form;
}

export async function GetFormWithSubmissions(id: number) {
  const { userId } = auth();

  if (!userId) {
    throw new UserNotFoundError();
  }

  const form = await prismadb.form.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      formSubmissions: true,
    },
  });

  return form;
}
