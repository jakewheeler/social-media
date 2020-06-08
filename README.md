# Social Media

Social Media is an application meant to resemble Twitter's user interface and features. At this point in time, Social Media is a client-side rendered app that relies on being on a few key APIs to drive the experience.

## How it Works

Social Media does not have accounts. Instead, the user provides their own `seed` which will be used to determine who they login as. Upon login, users will see their dynamically generated feed and will be able to post messages. When the user logs out, this information will disappear even if they try to use the same seed again.

## Planned Features

Check out the project issues to see what I have planned. I'm continuously updating and changing things at the moment!

## Tech Stack

- Next.js
- Chakra UI
- SWR

Continuously deployed on [Vercel](https://vercel.com/) at [https://social-media.jakewheeler.now.sh/](https://social-media.jakewheeler.now.sh).
