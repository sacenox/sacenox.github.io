---
name: write-blog-post
description: >-
  Write a dev update blog post for sacenox.github.io. Use when the user asks
  to write, draft, or publish a blog post, dev log, or project update.
  Scans git history across github projects, writes a Jekyll post matching
  existing tone, and commits/pushes. Triggers on: blog post, dev update,
  dev log, write a post, publish update, project recap.
compatibility: Requires shell access. Expects ~/src/sacenox.github.io to be a Jekyll blog repo.
---

# Write a Dev Update Blog Post

Generate a lighthearted dev update post for the sacenox.github.io Jekyll blog by scanning recent git activity across projects.

## Privacy and scope guardrails

- Treat this as a publishing workflow: anything gathered may end up on the public internet.
- Only inspect the blog repo at `~/src/sacenox.github.io` for existing posts and for writing the new post.
- For project activity, use only public GitHub data via `gh`. Do **not** inspect local project directories, local git logs, working trees, dotfiles, untracked files, or private repos.
- Do **not** use local fallbacks such as `find ~/src`, `git -C ~/src/<repo> ...`, or reading files from other project folders.
- If GitHub data is unavailable, incomplete, or confusing, ask the user before using any non-public or local source.
- Never include information from unpublished local changes or private computer state unless the user explicitly provides or authorizes it for the post.
- Only commit or push when the user explicitly asks. For a dry run, write the post locally and stop.

## Prerequisites

- `~/src/sacenox.github.io` exists and is a git repo with `_posts/` directory
- `gh` command is available in shell and authenticated

## Procedure

### 1. Identify the last post and its date

```bash
ls ~/src/sacenox.github.io/_posts/ | sort | tail -1
```

Read that file to understand:
- **Date cutoff** — only gather git history *after* that post's date
- **Voice and tone** — match the existing style (casual, technical, self-deprecating humor)
- **Front matter format** — use the same `layout`, `title`, `description` fields

### 2. Scan recent activity across public GitHub repos

Use the GitHub CLI as the source of truth. Do not fall back to local clones.

Important `gh api` footgun: when query fields are supplied with `-f`/`--field`, `gh api` defaults to `POST`. For GitHub REST read endpoints like commits and tags, always pass `--method GET` before `-f ...`.

First, smoke-test auth and list the public personal repos owned by the authenticated account, excluding `sacenox.github.io`:

```bash
GH_USER="$(gh api --method GET user --jq .login)"

gh repo list "$GH_USER" \
  --visibility=public \
  --no-archived \
  --limit 200 \
  --json nameWithOwner,name,isArchived,isPrivate,isInOrganization,pushedAt,url \
  --jq '.[] | select(.name != "sacenox.github.io") | select(.isArchived == false) | select(.isPrivate == false) | select(.isInOrganization == false) | [.nameWithOwner, .pushedAt, .url] | @tsv'
```

Then inspect recent activity since the last post date. Replace `YYYY-MM-DD` with the date of the last post:

```bash
set -euo pipefail

GH_USER="$(gh api --method GET user --jq .login)"
SINCE="YYYY-MM-DD"
SINCE_TS="${SINCE}T00:00:00Z"

gh repo list "$GH_USER" \
  --visibility=public \
  --no-archived \
  --limit 200 \
  --json nameWithOwner,name,isArchived,isPrivate,isInOrganization,pushedAt,url \
  --jq '.[] | select(.name != "sacenox.github.io") | select(.isArchived == false) | select(.isPrivate == false) | select(.isInOrganization == false) | [.nameWithOwner, .pushedAt, .url] | @tsv' |
while IFS=$'\t' read -r repo pushed_at url; do
  [ -n "${repo:-}" ] || continue

  if ! commits="$(gh api --method GET "repos/$repo/commits" \
      -f since="$SINCE_TS" \
      -f per_page=100 \
      --paginate \
      --jq '.[] | "\(.sha[0:7]) \(.commit.author.date) \(.commit.message | split("\n")[0])"' 2>/dev/null)"; then
    echo "WARN: failed to fetch commits for $repo; skipping" >&2
    continue
  fi

  count="$(printf '%s\n' "$commits" | awk 'NF { n++ } END { print n + 0 }')"
  [ "$count" -gt 0 ] || continue

  echo "=== $repo ==="
  echo "URL: $url"
  echo "Pushed: $pushed_at"
  echo "Commit count since $SINCE: $count"
  echo "Recent commits:"
  printf '%s\n' "$commits" | awk 'NR <= 20 { print }'

  releases="$(gh release list \
    --repo "$repo" \
    --limit 10 \
    --json tagName,publishedAt,isPrerelease,isLatest \
    --jq '.[] | "\(.tagName) \(.publishedAt)\(if .isPrerelease then " prerelease" else "" end)\(if .isLatest then " latest" else "" end)"' 2>/dev/null || true)"
  if [ -n "$releases" ]; then
    echo "Releases:"
    printf '%s\n' "$releases" | awk 'NR <= 10 { print }'
  else
    tags="$(gh api --method GET "repos/$repo/tags" \
      -f per_page=10 \
      --jq '.[] | .name' 2>/dev/null || true)"
    if [ -n "$tags" ]; then
      echo "Latest tags:"
      printf '%s\n' "$tags" | awk 'NR <= 10 { print }'
    fi
  fi

  echo
done
```

Focus on:
- **Feature commits** (`feat:` prefix) — these are the headlines
- **Notable fixes** (`fix:` prefix) — especially funny or hard-won bugs
- **Release tags** — releases from `gh release list`, or latest tag names from the GitHub API when releases do not exist; do not call a tag "recent" unless the output includes a date that supports it
- **Commit volume** — count commits since `YYYY-MM-DD`
- **Recently pushed repos** — public repos with meaningful activity since the previous post

### 3. Identify the main project and themes

The user will typically tell you what to focus on. If not, pick the project with the most commits since the last post. Look for:
- Release milestones (RC → stable, version bumps)
- New libraries or tools that were born
- Amusing bug stories (one-line fix, long debugging session)
- Side projects that got some love

### 4. Write the post

**File naming:** `YYYY-MM-DD-<slug>.md` where the date is today.

**Idempotency check** — before creating, check if today's post already exists:

```bash
existing=$(ls ~/src/sacenox.github.io/_posts/ | grep "^$(date +%Y-%m-%d)" || true)
```

If a post for today exists and covers the same topic, update it in place rather than creating a duplicate. If it covers a different topic, use a distinct slug.

**Front matter template:**

```yaml
---
layout: post
title: slug-style-title-with-hyphens
description: One sentence summary, max ~160 chars for SEO.
---
```

**Content guidelines:**
- Start with an `# H1` title (can differ from the slug — use natural language)
- Reference the previous post with a relative link: `[text](/posts/<previous-title-slug>/)`
- Use `##` sections to break up the narrative
- Include a stats table if there are interesting numbers
- End with install/try-it instructions and a link to the GitHub repo
- Keep it under 150 lines of markdown
- Tone: fun, lighthearted, first-person. Technical but not dry.

### 5. Verify and commit

```bash
cd ~/src/sacenox.github.io

# Stage and commit
git add _posts/YYYY-MM-DD-<slug>.md
git commit -m "Add post: <short title>"

# Push
git push origin main
```

## Gotchas

- **Title field is a slug**, not a human-readable title. The `# H1` inside the post is the display title.
- **Permalink format** is `/posts/:title/` — the `:title` comes from the slug in the `title` front matter field. Link to other posts using this pattern.
- **Don't invent GitHub URLs** — only link to repos using the `url` returned by `gh repo list`, or verify with `gh repo view OWNER/REPO --json url --jq .url`. Do not check local remotes outside the blog repo.
- **Date in filename must match today** — Jekyll won't render future-dated posts by default.
- Posts are **not** auto-deployed by n8n anymore; manual `git push` is the deploy step.
- Make sure to only include **public** and personal (not from an organization) repositories in the post.
