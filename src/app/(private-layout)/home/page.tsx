import { auth } from "@/auth";
import { getPosts } from "@/features/posts/lib";
import { PostSection } from "@/features/posts/post-section";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const posts = await getPosts();

  return (
    <main className="container max-w-screen-sm py-8">
      <PostSection
        posts={posts}
        authorName={session.user.name}
        authorUsername={session.user.username}
        authorImage={session.user.image}
        session={session}
      />
    </main>
  );
}
