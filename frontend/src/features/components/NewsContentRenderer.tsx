// components/news/NewsContentRenderer.tsx
import React from 'react';

type QuillOp = {
    insert: string;
    attributes?: {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
        strike?: boolean;
        color?: string;
        background?: string;
        font?: string;
        size?: string | number;
        header?: number | boolean;
        align?: string;
        list?: string;
        indent?: number;
        blockquote?: boolean;
        'code-block'?: boolean;
        link?: string;
        image?: string;
        video?: string;
    };
};

type QuillDelta = {
    ops: QuillOp[];
};

interface NewsContentRendererProps {
    content: QuillDelta | string | null;
    className?: string;
}

const NewsContentRenderer: React.FC<NewsContentRendererProps> = ({
    content,
    className = "prose prose-lg max-w-none"
}) => {

    if (!content) {
        return <p className="text-gray-500 italic">No content available</p>;
    }

    // Handle string content (plain text fallback)
    if (typeof content === 'string') {
        return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
    }

    // Handle Quill Delta format
    if (content.ops && Array.isArray(content.ops)) {
        return (
            <div className={className}>
                {renderOps(content.ops)}
            </div>
        );
    }

    return <p className="text-gray-500 italic">Unsupported content format</p>;
};

// Helper function to render individual ops
const renderOps = (ops: QuillOp[]) => {
    const elements: JSX.Element[] = [];
    let currentList: { type: string; items: JSX.Element[] } | null = null;

    ops.forEach((op, index) => {
        const { insert, attributes = {} } = op;

        // Handle list items
        if (attributes.list) {
            const listType = attributes.list === 'bullet' ? 'ul' : 'ol';

            if (!currentList || currentList.type !== listType) {
                // Start new list
                if (currentList) {
                    elements.push(renderList(currentList.type, currentList.items));
                }
                currentList = { type: listType, items: [] };
            }

            // Add item to current list
            currentList.items.push(
                <li key={`list-item-${index}`} style={getTextStyles(attributes)}>
                    {insert}
                </li>
            );
            return;
        }

        // If we were building a list and it ends, render it
        if (currentList) {
            elements.push(renderList(currentList.type, currentList.items));
            currentList = null;
        }

        // Handle blockquotes
        if (attributes.blockquote) {
            elements.push(
                <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4">
                    {insert}
                </blockquote>
            );
            return;
        }

        // Handle code blocks
        if (attributes['code-block']) {
            elements.push(
                <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                    <code>{insert}</code>
                </pre>
            );
            return;
        }

        // Handle headers
        if (attributes.header) {
            const HeaderTag = `h${attributes.header}` as keyof JSX.IntrinsicElements;
            elements.push(
                <HeaderTag key={index} className={`header-${attributes.header}`} style={getTextStyles(attributes)}>
                    {insert}
                </HeaderTag>
            );
            return;
        }

        // Handle images
        if (attributes.image) {
            elements.push(
                <img
                    key={index}
                    src={attributes.image}
                    alt="Content image"
                    className="max-w-full h-auto my-4 rounded-lg"
                />
            );
            return;
        }

        // Handle videos
        if (attributes.video) {
            elements.push(
                <video
                    key={index}
                    src={attributes.video}
                    controls
                    className="max-w-full my-4 rounded-lg"
                />
            );
            return;
        }

        // Handle links
        if (attributes.link) {
            elements.push(
                <a
                    key={index}
                    href={attributes.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    style={getTextStyles(attributes)}
                >
                    {insert}
                </a>
            );
            return;
        }

        // Handle regular text with formatting
        if (insert.trim() !== '' || insert === '\n') {
            if (insert === '\n') {
                elements.push(<br key={index} />);
            } else {
                elements.push(
                    <span key={index} style={getTextStyles(attributes)}>
                        {applyInlineFormatting(insert, attributes)}
                    </span>
                );
            }
        }
    });

    // Render any remaining list
    if (currentList) {
        elements.push(renderList(currentList.type, currentList.items));
    }

    return elements;
};

// Helper to render lists
const renderList = (type: string, items: JSX.Element[]) => {
    const ListTag = type as keyof JSX.IntrinsicElements;
    return <ListTag className="list-inside my-4">{items}</ListTag>;
};

// Helper to get text styles from attributes
const getTextStyles = (attributes: QuillOp['attributes']): React.CSSProperties => {
    const styles: React.CSSProperties = {};

    if (attributes?.color) styles.color = attributes.color;
    if (attributes?.background) styles.backgroundColor = attributes.background;
    if (attributes?.size) {
        if (attributes.size === 'small') styles.fontSize = '0.875rem';
        else if (attributes.size === 'large') styles.fontSize = '1.25rem';
        else if (attributes.size === 'huge') styles.fontSize = '1.5rem';
    }
    if (attributes?.align) styles.textAlign = attributes.align as any;
    if (attributes?.indent) styles.marginLeft = `${Number(attributes.indent) * 1.5}rem`;

    return styles;
};

// Helper to apply inline formatting
const applyInlineFormatting = (text: string, attributes: QuillOp['attributes']): React.ReactNode => {
    let formatted: React.ReactNode = text;

    if (attributes?.bold) formatted = <strong>{formatted}</strong>;
    if (attributes?.italic) formatted = <em>{formatted}</em>;
    if (attributes?.underline) formatted = <u>{formatted}</u>;
    if (attributes?.strike) formatted = <s>{formatted}</s>;

    return formatted;
};

export default NewsContentRenderer;