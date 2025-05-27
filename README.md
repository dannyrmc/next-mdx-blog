# MDX and Next.js Blog Template

![Cover image of Blog](/public/images/readme-cover.png)

Crafted blog template built using Next.js, Tailwind CSS, MDX, and TypeScript. This locally hosted blog is for those who want full control of the design and content.

## Features

- MDX (Extended Markdown)
- Dark Mode
- Customizable MDX components
- Formatted code block
- Loading blur for dynamic images
- Calculated blog post reading time
- Shadcn/ui initiated
- Custom typography prose (in progress)

## Performance

As of this writing, Blog has achieved a 100% Lighthouse score.

***

## Install & Run

1. Make sure you have `node` and `npm` installed.

2. Install dependencies from [/package.json](/package.json):

    ```bash
    npm install
    ```

3. Start the dev server:

    ```bash
    npm run dev
    ```

4. View app locally in the browser

    ```bash
    http://localhost:3000
    ```

## Add Content

The MDX content is located in the [/_posts](/_posts) directory. This is where you can add or modify content.

Just add a new file with the extension of `.mdx`

For example, `first-post.mdx`

<br>

**IMPORTANT**: the filename must be lowercase and use dashes instead of spaces.

```bash
🚫 filename with spaces.mdx
```

```bash
✅ filename-with-dashes.mdx
```

***

### Using MDX Components

In addition to standard Markdown features, Blog comes with a few MDX components predefined.

**Image Component**

```bash
<Image
  src="/images/placeholder.webp"
  alt="Description of image"
/>
```

You can also add an optional `caption` and/or `border`

```bash
<Image
  src="/images/sample.webp"
  alt="Description of image"
  caption="Image caption"
  border
/>
```

**Callout Component**

```bash
<Callout emoji="💡">
  This is a callout component with an emoji
</Callout>
```

**Highlighter Component**

```bash
<Highlighter>
  Highlighted sentence.
</Highlighter>
```

**Inline Code Component**

```bash
<InlineCode>
  node
</InlineCode>
```

**Code Block Component**

Similar to Markdown, code blocks are formatted by surrounding the code with backtick marks.

You can also specify the coding language after the first 3 backtick marks.

````bash
```javascript
const Category = (props) => {
  return (
    <div className="rounded-3xl border p-2">
      <p className="font-bold uppercase leading-3 tracking-widest text-sm">
        {props.category_label}
      </p>
    </div>
  );
};
export default Category;
```
````

To escape the code formatting, change the language to `text`

````bash
```text
filename_1.jpg
filename_2.jpg
filename_3.jpg
```
````

---

### License

This project is licensed under the [MIT License](/LICENSE).
