import { type Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';
import { prisma } from '@/modules/prisma';
import { getId } from '@/utils/get-id';

function createFakePost(): Prisma.PostCreateInput {
  const title = faker.word.words(3);
  const slug = slugify(title);
  const content = `${faker.lorem.sentence({ min: 10, max: 10 })}

    # ${title}
    ${faker.lorem.paragraphs(3)}

    ## ${faker.airline.airline().name}
    ${faker.lorem.paragraphs(3)}

    ---

    ${faker.lorem.paragraphs(2)}
  `;

  return {
    title,
    slug,
    content,
    id: getId('pst'),
  };
}

export async function runSeeding() {
  await prisma.post.createMany({
    data: faker.helpers.multiple(createFakePost, {
      count: 20,
    }),
  });
}
