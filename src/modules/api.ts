export async function fetchSubreddit(subreddit: string) {
  const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  const rawData = await res.json();

  const data = rawData.data.children.map((child: any) => child.data);

  return data;
}
