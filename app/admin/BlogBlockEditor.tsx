"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import type { BlogPost } from "@/app/data/blogs";
import ImageUploadField from "./ImageUploadField";

type Block = BlogPost["contentBlocks"][number];
type BlockType = Block["type"];
const defaultStyle = (): Block["style"] => ({ textAlign: "left", fontSize: "medium", textColor: "", backgroundColor: "", spacing: "normal", imageWidth: "100", imageAlign: "center", borderRadius: "16", fontWeight: "400", fontStyle: "normal", textDecoration: "none", lineHeight: "normal", textTransform: "none", padding: "0", blockRadius: "0", borderColor: "", imageMaxHeight: "auto", imageObjectFit: "contain", imageShadow: "soft" });
const palette: Array<{ type: BlockType; label: string; icon: string; help: string }> = [
  { type: "heading", label: "Add Heading", icon: "H1", help: "Main article section" },
  { type: "subheading", label: "Add Subheading", icon: "H2", help: "Section within a topic" },
  { type: "content", label: "Add Content", icon: "¶", help: "Paragraph or formatted text" },
  { type: "image", label: "Add Image", icon: "▧", help: "Upload an inline image" },
  { type: "quote", label: "Add Quote", icon: "❝", help: "Highlighted quotation" },
  { type: "bulletList", label: "Add Bullet List", icon: "•", help: "One item per line" },
  { type: "numberedList", label: "Add Numbered List", icon: "1.", help: "Ordered steps or points" },
  { type: "callout", label: "Add Callout", icon: "!", help: "Important note or insight" },
  { type: "divider", label: "Add Divider", icon: "—", help: "Separate article sections" },
  { type: "link", label: "Add Link", icon: "↗", help: "CTA or related resource" },
];

const newBlock = (type: BlockType): Block => ({ id: `block-${crypto.randomUUID().slice(0, 10)}`, type, value: "", imageSrc: "", imageAlt: "", caption: "", linkUrl: "", headingLevel: type === "heading" ? 2 : type === "subheading" ? 3 : undefined, style: defaultStyle() });

function LegacyRichTextField({ id, label, value, rows, placeholder, onChange }: { id: string; label: string; value: string; rows: number; placeholder: string; onChange: (value: string) => void }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const selection = useRef({ start: 0, end: 0 });
  const rememberSelection = () => { if (ref.current) selection.current = { start: ref.current.selectionStart, end: ref.current.selectionEnd }; };
  const wrap = (before: string, after: string, fallback = "text") => {
    const { start, end } = selection.current;
    const selected = value.slice(start, end) || fallback;
    const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
    onChange(next);
    requestAnimationFrame(() => { ref.current?.focus(); ref.current?.setSelectionRange(start + before.length, start + before.length + selected.length); });
  };
  const addLink = () => { const url = window.prompt("Enter the link URL", "https://"); if (url) wrap(`<a href="${url.replace(/"/g, "&quot;")}">`, "</a>", "link text"); };
  return <div className="admin-field admin-rich-field"><label htmlFor={id}>{label}</label><div className="admin-inline-toolbar" aria-label={`${label} formatting tools`}><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => wrap("<strong>", "</strong>")} title="Bold"><strong>B</strong></button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => wrap("<em>", "</em>")} title="Italic"><em>I</em></button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => wrap("<u>", "</u>")} title="Underline"><u>U</u></button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => wrap("<mark>", "</mark>")} title="Highlight">Highlight</button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => wrap('<span style="font-size:0.85em">', "</span>")} title="Smaller selected text">A−</button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => wrap('<span style="font-size:1.2em">', "</span>")} title="Larger selected text">A+</button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => wrap('<span style="color:#087b71">', "</span>")} title="Brand green">Green</button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => wrap('<span style="color:#ee9e1e">', "</span>")} title="Brand orange">Orange</button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={addLink} title="Add link">Link</button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => wrap("<code>", "</code>")} title="Inline code">Code</button></div><textarea ref={ref} id={id} rows={rows} value={value} onSelect={rememberSelection} onClick={rememberSelection} onKeyUp={rememberSelection} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /><small>Select text, then choose a formatting option. Formatting is reflected in preview and the published blog.</small></div>;
}

void LegacyRichTextField;

function RichTextField({ id, label, value, rows, placeholder, onChange }: { id: string; label: string; value: string; rows: number; placeholder: string; onChange: (value: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== value) editor.innerHTML = value;
  }, [value]);

  const run = (command: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current?.innerHTML || "");
  };

  const addLink = () => {
    const url = window.prompt("Enter the link URL", "https://");
    if (url) run("createLink", url);
  };

  return <div className="admin-field admin-rich-field">
    <label htmlFor={id}>{label}</label>
    <div className="admin-inline-toolbar" aria-label={`${label} formatting tools`}>
      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("bold")} title="Bold"><strong>B</strong></button>
      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("italic")} title="Italic"><em>I</em></button>
      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("underline")} title="Underline"><u>U</u></button>
      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("backColor", "#fff1ad")} title="Highlight">Highlight</button>
      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("fontSize", "2")} title="Smaller selected text">A−</button>
      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("fontSize", "5")} title="Larger selected text">A+</button>
      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("foreColor", "#087b71")} title="Brand green">Green</button>
      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("foreColor", "#ee9e1e")} title="Brand orange">Orange</button>
      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={addLink} title="Add link">Link</button>
      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("formatBlock", "pre")} title="Inline code">Code</button>
    </div>
    <div
      ref={editorRef}
      id={id}
      className="admin-rich-editor"
      contentEditable
      role="textbox"
      aria-multiline="true"
      aria-label={label}
      data-placeholder={placeholder}
      style={{ minHeight: `${Math.max(rows * 24, 58)}px` }}
      suppressContentEditableWarning
      onInput={(event) => onChange(event.currentTarget.innerHTML)}
    />
    <small>Select text, then choose a formatting option. The editor shows formatting without exposing HTML tags.</small>
  </div>;
}

function PreviewHtmlFixer({ blocks }: { blocks: Block[] }) {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".admin-preview-page");
    if (!page) return;
    const description = page.querySelector(".description");
    const previewNodes = Array.from(page.children).slice(description ? Array.from(page.children).indexOf(description) + 1 : 2).filter((node) => !node.classList.contains("featured"));
    blocks.forEach((block, index) => {
      if (!["heading", "subheading", "content", "quote", "callout"].includes(block.type)) return;
      const node = previewNodes[index] as HTMLElement | undefined;
      if (!node) return;
      const fontSize = { small: "14px", medium: "16px", large: "20px", xlarge: "26px" }[block.style?.fontSize || "medium"];
      const margin = block.style?.spacing === "compact" ? "10px 0" : block.style?.spacing === "spacious" ? "34px 0" : "20px 0";
      Object.assign(node.style, { textAlign: block.style?.textAlign || "left", color: block.style?.textColor || "", backgroundColor: block.style?.backgroundColor || "", fontSize, fontWeight: block.style?.fontWeight || "400", fontStyle: block.style?.fontStyle || "normal", textDecoration: block.style?.textDecoration || "none", lineHeight: block.style?.lineHeight === "compact" ? "1.35" : block.style?.lineHeight === "relaxed" ? "2" : "1.8", textTransform: block.style?.textTransform || "none", padding: `${block.style?.padding || "0"}px`, margin, borderRadius: `${block.style?.blockRadius || "0"}px`, border: block.style?.borderColor ? `1px solid ${block.style.borderColor}` : "" });
      if (node.innerHTML !== block.value) node.innerHTML = block.value || (({ heading: "Heading", subheading: "Subheading", content: "Content", quote: "Quote", callout: "Callout" } as Partial<Record<BlockType, string>>)[block.type] ?? "");
    });
  }, [blocks]);
  return null;
}

export default function BlogBlockEditor({ blocks, title, description, featuredImage, featuredImageStyle, onChange, onImageUploaded, onError }: { blocks: Block[]; title: string; description: string; featuredImage: string; featuredImageStyle: BlogPost["featuredImageStyle"]; onChange: (blocks: Block[]) => void; onImageUploaded: (path: string) => void; onError: (message: string) => void }) {
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const add = (type: BlockType, index = blocks.length) => { const next = [...blocks]; next.splice(index, 0, newBlock(type)); onChange(next); };
  const update = (id: string, values: Partial<Block>) => onChange(blocks.map((block) => block.id === id ? { ...block, ...values } : block));
  const updateStyle = (id: string, values: Partial<Block["style"]>) => onChange(blocks.map((block) => block.id === id ? { ...block, style: { ...defaultStyle(), ...block.style, ...values } } : block));
  const remove = (id: string) => onChange(blocks.filter((block) => block.id !== id));
  const duplicate = (block: Block, index: number) => { const copy = { ...block, id: `block-${crypto.randomUUID().slice(0, 10)}`, style: { ...block.style } }; const next = [...blocks]; next.splice(index + 1, 0, copy); onChange(next); };
  const move = (id: string, targetIndex: number) => {
    const sourceIndex = blocks.findIndex((block) => block.id === id);
    if (sourceIndex < 0) return;
    const next = [...blocks];
    const [block] = next.splice(sourceIndex, 1);
    next.splice(sourceIndex < targetIndex ? targetIndex - 1 : targetIndex, 0, block);
    onChange(next);
  };
  const drop = (event: React.DragEvent, index: number) => {
    event.preventDefault();
    const existingId = event.dataTransfer.getData("application/x-blog-block-id");
    const type = event.dataTransfer.getData("application/x-blog-block-type") as BlockType;
    if (existingId) move(existingId, index);
    else if (palette.some((item) => item.type === type)) add(type, index);
    setDropIndex(null);
  };

  return <div className="admin-block-builder"><PreviewHtmlFixer blocks={blocks} />
    <section className="admin-block-canvas" onDragOver={(event) => event.preventDefault()} onDrop={(event) => drop(event, blocks.length)}>
      <div className="admin-block-canvas-heading"><div><label>Blog page content</label><small>Drag blocks from the right panel and arrange them in any order.</small></div><span>{blocks.length} blocks</span></div>
      {blocks.length === 0 && <div className={`admin-block-empty ${dropIndex === 0 ? "is-drop-active" : ""}`} onDragEnter={() => setDropIndex(0)} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDropIndex(null)} onDrop={(event) => drop(event, 0)}><strong>Drop a content block here</strong><small>Or select an item from the right panel.</small></div>}
      {blocks.map((block, index) => <div key={block.id} className="admin-block-row-wrap">
        <div className={`admin-block-insert-zone ${dropIndex === index ? "is-active" : ""}`} onDragEnter={(event) => { event.preventDefault(); setDropIndex(index); }} onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = event.dataTransfer.types.includes("application/x-blog-block-id") ? "move" : "copy"; }} onDrop={(event) => { event.stopPropagation(); drop(event, index); }}><span>Drop block here</span></div>
        <article className="admin-content-block" draggable onDragStart={(event) => { event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("application/x-blog-block-id", block.id); }} onDragEnd={() => setDropIndex(null)}>
          <div className="admin-content-block-header"><span className="admin-drag-handle" aria-label="Drag to reorder" title="Drag to reorder">⋮⋮</span><strong>{palette.find((item) => item.type === block.type)?.label.replace("Add ", "")}</strong><div><button type="button" onClick={() => duplicate(block, index)} aria-label="Duplicate block" title="Duplicate block">⧉</button><button type="button" onClick={() => index > 0 && move(block.id, index - 1)} disabled={index === 0} aria-label="Move block up">↑</button><button type="button" onClick={() => index < blocks.length - 1 && move(block.id, index + 2)} disabled={index === blocks.length - 1} aria-label="Move block down">↓</button><button type="button" className="remove" onClick={() => remove(block.id)} aria-label="Remove block">×</button></div></div>
          {block.type === "heading" && <div className="admin-block-heading-fields"><div className="admin-field"><label htmlFor={`${block.id}-level`}>Heading type</label><select id={`${block.id}-level`} value={block.headingLevel || 2} onChange={(event) => update(block.id, { headingLevel: Number(event.target.value) as Block["headingLevel"] })}>{[1,2,3,4,5,6].map((level)=><option value={level} key={level}>H{level}</option>)}</select></div><RichTextField id={`${block.id}-value`} label="Heading text" rows={2} value={block.value} onChange={(value) => update(block.id, { value })} placeholder="Enter section heading" /></div>}
          {block.type === "subheading" && <div className="admin-block-heading-fields"><div className="admin-field"><label htmlFor={`${block.id}-level`}>Subheading type</label><select id={`${block.id}-level`} value={Math.max(2, block.headingLevel || 3)} onChange={(event) => update(block.id, { headingLevel: Number(event.target.value) as Block["headingLevel"] })}>{[2,3,4,5,6].map((level)=><option value={level} key={level}>H{level}</option>)}</select></div><RichTextField id={`${block.id}-value`} label="Subheading text" rows={2} value={block.value} onChange={(value) => update(block.id, { value })} placeholder="Enter subsection heading" /></div>}
          {block.type === "content" && <RichTextField id={`${block.id}-value`} label="Content" rows={6} value={block.value} onChange={(value) => update(block.id, { value })} placeholder="Enter paragraph text" />}
          {block.type === "quote" && <RichTextField id={`${block.id}-value`} label="Quotation" rows={4} value={block.value} onChange={(value) => update(block.id, { value })} placeholder="Enter the highlighted quote" />}
          {(block.type === "bulletList" || block.type === "numberedList") && <div className="admin-field"><label htmlFor={`${block.id}-value`}>{block.type === "bulletList" ? "Bullet list items" : "Numbered list items"}</label><textarea id={`${block.id}-value`} rows={6} value={block.value} onChange={(event) => update(block.id, { value: event.target.value })} placeholder="Enter one item per line" /><small>Each non-empty line becomes a separate list item.</small></div>}
          {block.type === "callout" && <RichTextField id={`${block.id}-value`} label="Callout text" rows={4} value={block.value} onChange={(value) => update(block.id, { value })} placeholder="Enter an important note, tip, or disclaimer" />}
          {block.type === "divider" && <div className="admin-divider-preview"><span />Section divider</div>}
          {block.type === "link" && <div className="admin-block-image-fields"><div className="admin-field"><label htmlFor={`${block.id}-value`}>Link text</label><input id={`${block.id}-value`} value={block.value} onChange={(event) => update(block.id, { value: event.target.value })} placeholder="Read more" /></div><div className="admin-field"><label htmlFor={`${block.id}-url`}>Link URL</label><input id={`${block.id}-url`} value={block.linkUrl} onChange={(event) => update(block.id, { linkUrl: event.target.value })} placeholder="/blogs or https://..." /></div></div>}
          {block.type === "image" && <><ImageUploadField id={`${block.id}-upload`} label="Inline image" value={block.imageSrc} alt={block.imageAlt} onUploaded={(path) => { update(block.id, { imageSrc: path }); onImageUploaded(path); }} onError={onError}/><div className="admin-block-image-fields"><div className="admin-field"><label htmlFor={`${block.id}-alt`}>Alternative text</label><input id={`${block.id}-alt`} value={block.imageAlt} onChange={(event) => update(block.id, { imageAlt: event.target.value })} /></div><div className="admin-field"><label htmlFor={`${block.id}-caption`}>Caption (optional)</label><input id={`${block.id}-caption`} value={block.caption} onChange={(event) => update(block.id, { caption: event.target.value })} /></div></div></>}
          <details className="admin-block-style-tools"><summary>Style settings</summary><div className="admin-block-style-grid">
            {block.type !== "image" && <><div className="admin-field"><label htmlFor={`${block.id}-align`}>Alignment</label><select id={`${block.id}-align`} value={block.style?.textAlign || "left"} onChange={(event) => updateStyle(block.id, { textAlign: event.target.value as Block["style"]["textAlign"] })}><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div><div className="admin-field"><label htmlFor={`${block.id}-size`}>Text size</label><select id={`${block.id}-size`} value={block.style?.fontSize || "medium"} onChange={(event) => updateStyle(block.id, { fontSize: event.target.value as Block["style"]["fontSize"] })}><option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option><option value="xlarge">Extra large</option></select></div><div className="admin-field admin-color-field"><label htmlFor={`${block.id}-color`}>Text color</label><input id={`${block.id}-color`} type="color" value={block.style?.textColor || "#232555"} onChange={(event) => updateStyle(block.id, { textColor: event.target.value })} /><button type="button" onClick={() => updateStyle(block.id, { textColor: "" })}>Reset</button></div></>}
            <div className="admin-field admin-color-field"><label htmlFor={`${block.id}-background`}>Background</label><input id={`${block.id}-background`} type="color" value={block.style?.backgroundColor || "#ffffff"} onChange={(event) => updateStyle(block.id, { backgroundColor: event.target.value })} /><button type="button" onClick={() => updateStyle(block.id, { backgroundColor: "" })}>Reset</button></div>
            <div className="admin-field"><label htmlFor={`${block.id}-spacing`}>Spacing</label><select id={`${block.id}-spacing`} value={block.style?.spacing || "normal"} onChange={(event) => updateStyle(block.id, { spacing: event.target.value as Block["style"]["spacing"] })}><option value="compact">Compact</option><option value="normal">Normal</option><option value="spacious">Spacious</option></select></div>
            {block.type !== "image" && <><div className="admin-field"><label htmlFor={`${block.id}-weight`}>Font weight</label><select id={`${block.id}-weight`} value={block.style?.fontWeight || "400"} onChange={(event) => updateStyle(block.id, { fontWeight: event.target.value as Block["style"]["fontWeight"] })}><option value="400">Regular</option><option value="500">Medium</option><option value="600">Semi bold</option><option value="700">Bold</option></select></div><div className="admin-field"><label htmlFor={`${block.id}-line-height`}>Line height</label><select id={`${block.id}-line-height`} value={block.style?.lineHeight || "normal"} onChange={(event) => updateStyle(block.id, { lineHeight: event.target.value as Block["style"]["lineHeight"] })}><option value="compact">Compact</option><option value="normal">Normal</option><option value="relaxed">Relaxed</option></select></div><div className="admin-field"><label htmlFor={`${block.id}-transform`}>Letter case</label><select id={`${block.id}-transform`} value={block.style?.textTransform || "none"} onChange={(event) => updateStyle(block.id, { textTransform: event.target.value as Block["style"]["textTransform"] })}><option value="none">Original</option><option value="uppercase">UPPERCASE</option><option value="capitalize">Capitalize</option></select></div><div className="admin-field admin-toggle-field"><label>Text format</label><div><button type="button" className={block.style?.fontStyle === "italic" ? "is-active" : ""} onClick={() => updateStyle(block.id, { fontStyle: block.style?.fontStyle === "italic" ? "normal" : "italic" })}><em>I</em></button><button type="button" className={block.style?.textDecoration === "underline" ? "is-active" : ""} onClick={() => updateStyle(block.id, { textDecoration: block.style?.textDecoration === "underline" ? "none" : "underline" })}><u>U</u></button></div></div></>}
            <div className="admin-field"><label htmlFor={`${block.id}-padding`}>Inner padding</label><select id={`${block.id}-padding`} value={block.style?.padding || "0"} onChange={(event) => updateStyle(block.id, { padding: event.target.value as Block["style"]["padding"] })}><option value="0">None</option><option value="12">Small</option><option value="20">Medium</option><option value="32">Large</option></select></div>
            <div className="admin-field"><label htmlFor={`${block.id}-block-radius`}>Block corners</label><select id={`${block.id}-block-radius`} value={block.style?.blockRadius || "0"} onChange={(event) => updateStyle(block.id, { blockRadius: event.target.value as Block["style"]["blockRadius"] })}><option value="0">Square</option><option value="8">Small</option><option value="16">Medium</option><option value="24">Large</option></select></div>
            <div className="admin-field admin-color-field"><label htmlFor={`${block.id}-border-color`}>Border color</label><input id={`${block.id}-border-color`} type="color" value={block.style?.borderColor || "#dce2e8"} onChange={(event) => updateStyle(block.id, { borderColor: event.target.value })} /><button type="button" onClick={() => updateStyle(block.id, { borderColor: "" })}>Reset</button></div>
            {block.type === "image" && <><div className="admin-field"><label htmlFor={`${block.id}-width`}>Image width</label><select id={`${block.id}-width`} value={block.style?.imageWidth || "100"} onChange={(event) => updateStyle(block.id, { imageWidth: event.target.value as Block["style"]["imageWidth"] })}><option value="25">25%</option><option value="50">50%</option><option value="75">75%</option><option value="100">100%</option></select></div><div className="admin-field"><label htmlFor={`${block.id}-image-align`}>Image alignment</label><select id={`${block.id}-image-align`} value={block.style?.imageAlign || "center"} onChange={(event) => updateStyle(block.id, { imageAlign: event.target.value as Block["style"]["imageAlign"] })}><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div><div className="admin-field"><label htmlFor={`${block.id}-radius`}>Corner radius</label><select id={`${block.id}-radius`} value={block.style?.borderRadius || "16"} onChange={(event) => updateStyle(block.id, { borderRadius: event.target.value as Block["style"]["borderRadius"] })}><option value="0">Square</option><option value="8">Small</option><option value="16">Medium</option><option value="24">Large</option></select></div><div className="admin-field"><label htmlFor={`${block.id}-max-height`}>Maximum height</label><select id={`${block.id}-max-height`} value={block.style?.imageMaxHeight || "auto"} onChange={(event) => updateStyle(block.id, { imageMaxHeight: event.target.value as Block["style"]["imageMaxHeight"] })}><option value="320">320px</option><option value="480">480px</option><option value="640">640px</option><option value="auto">Natural</option></select></div><div className="admin-field"><label htmlFor={`${block.id}-fit`}>Image fit</label><select id={`${block.id}-fit`} value={block.style?.imageObjectFit || "contain"} onChange={(event) => updateStyle(block.id, { imageObjectFit: event.target.value as Block["style"]["imageObjectFit"] })}><option value="contain">Contain</option><option value="cover">Cover / crop</option></select></div><div className="admin-field"><label htmlFor={`${block.id}-shadow`}>Image shadow</label><select id={`${block.id}-shadow`} value={block.style?.imageShadow || "soft"} onChange={(event) => updateStyle(block.id, { imageShadow: event.target.value as Block["style"]["imageShadow"] })}><option value="none">None</option><option value="soft">Soft</option><option value="strong">Strong</option></select></div></>}
            <div className="admin-field admin-style-reset"><button type="button" onClick={() => update(block.id, { style: defaultStyle() })}>Reset all styles</button></div>
          </div></details>
        </article>
      </div>)}
      {blocks.length > 0 && <div className={`admin-block-insert-zone admin-block-drop-end ${dropIndex === blocks.length ? "is-active" : ""}`} onDragEnter={(event) => { event.preventDefault(); setDropIndex(blocks.length); }} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.stopPropagation(); drop(event, blocks.length); }}><span>Drop block here</span></div>}
    </section>
    <aside className="admin-block-side-panel"><div className="admin-block-palette" aria-label="Content blocks"><p className="admin-eyebrow">Add blocks</p><h3>Page elements</h3><small>Drag an element into the page or click to append it.</small>{palette.map((item) => <button type="button" draggable key={item.type} onDragStart={(event) => { event.dataTransfer.effectAllowed = "copy"; event.dataTransfer.setData("application/x-blog-block-type", item.type); }} onDragEnd={() => setDropIndex(null)} onClick={() => add(item.type)}><span>{item.icon}</span><div><strong>{item.label}</strong><small>{item.help}</small></div><i aria-hidden="true">⠿</i></button>)}</div><section className="admin-block-live-preview" aria-label="Live blog preview"><p className="admin-eyebrow">Live Preview</p><div className="admin-preview-page"><h1>{title || "Blog title"}</h1><p className="description">{description || "Your short description will appear here."}</p>{featuredImage && <img className="featured" src={featuredImage} alt="Featured preview" style={{width:`${featuredImageStyle.width}%`,maxHeight:featuredImageStyle.maxHeight==="auto"?"none":`${featuredImageStyle.maxHeight}px`,objectFit:featuredImageStyle.objectFit,borderRadius:`${featuredImageStyle.borderRadius}px`,marginLeft:featuredImageStyle.align==="right"||featuredImageStyle.align==="center"?"auto":0,marginRight:featuredImageStyle.align==="left"||featuredImageStyle.align==="center"?"auto":0}}/>}{blocks.map((block) => { const style = { textAlign: block.style?.textAlign || "left", color: block.style?.textColor || undefined, backgroundColor: block.style?.backgroundColor || undefined, fontWeight:block.style?.fontWeight || "400",fontStyle:block.style?.fontStyle || "normal",textDecoration:block.style?.textDecoration || "none",lineHeight:block.style?.lineHeight==="compact"?1.35:block.style?.lineHeight==="relaxed"?2:1.7,textTransform:block.style?.textTransform || "none",padding:`${block.style?.padding || "0"}px`,borderRadius:`${block.style?.blockRadius || "0"}px`,border:block.style?.borderColor?`1px solid ${block.style.borderColor}`:undefined } as React.CSSProperties; if(block.type==="heading")return <h2 key={block.id} style={style}>{block.value || "Heading"}</h2>;if(block.type==="subheading")return <h3 key={block.id} style={style}>{block.value || "Subheading"}</h3>;if(block.type==="image")return block.imageSrc?<img key={block.id} src={block.imageSrc} alt={block.imageAlt || "Content preview"} style={{width:`${block.style?.imageWidth || "100"}%`,maxHeight:block.style?.imageMaxHeight==="auto"?"none":`${block.style?.imageMaxHeight || "640"}px`,objectFit:block.style?.imageObjectFit || "contain",boxShadow:block.style?.imageShadow==="none"?"none":block.style?.imageShadow==="strong"?"0 16px 36px rgba(20,30,50,.25)":"0 10px 24px rgba(20,30,50,.12)",borderRadius:`${block.style?.borderRadius || "16"}px`,marginLeft:block.style?.imageAlign==="right"?"auto":block.style?.imageAlign==="center"?"auto":0,marginRight:block.style?.imageAlign==="left"?"auto":block.style?.imageAlign==="center"?"auto":0}}/>:<div className="image-placeholder" key={block.id}>Image</div>;if(block.type==="divider")return <hr key={block.id}/>;if(block.type==="bulletList"||block.type==="numberedList"){const Tag=block.type==="bulletList"?"ul":"ol";return <Tag key={block.id} style={style}>{block.value.split(/\r?\n/).filter(Boolean).map((item,index)=><li key={index}>{item}</li>)}</Tag>}if(block.type==="quote")return <blockquote key={block.id} style={style}>{block.value||"Quote"}</blockquote>;if(block.type==="callout")return <aside key={block.id} style={style}>{block.value||"Callout"}</aside>;if(block.type==="link")return <a key={block.id} href="#" style={style} onClick={(event)=>event.preventDefault()}>{block.value||"Link"}</a>;return <p key={block.id} style={style}>{block.value.replace(/<[^>]+>/g,"")||"Content"}</p>})}</div></section></aside>
  </div>;
}
