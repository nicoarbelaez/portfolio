import type { Root as HastRoot, Element } from 'hast';
import { visit } from 'unist-util-visit';

const VIDEO_EXT = /\.(mp4|webm|ogg)(\?.*)?$/i;
const YOUTUBE = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/i;

function isElement(node: unknown): node is Element {
  return Boolean(node && typeof node === 'object' && 'type' in node && node.type === 'element');
}

function getStringProp(props: Element['properties'] | undefined, key: string): string | null {
  const value = props?.[key];
  return typeof value === 'string' ? value : null;
}

/**
 * Wrap images/videos in `figure.md-media` and upgrade video URLs to <video>/<iframe>.
 * Keeps markdown styling centralized via Typeset CSS — no per-element React.
 */
export function rehypeMarkdownMedia() {
  return (tree: HastRoot) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return;

      if (node.tagName === 'img') {
        const alt = getStringProp(node.properties, 'alt') ?? '';
        const src = getStringProp(node.properties, 'src') ?? '';

        node.properties = {
          ...node.properties,
          loading: 'lazy',
          decoding: 'async'
        };

        if (VIDEO_EXT.test(src)) {
          parent.children[index] = {
            type: 'element',
            tagName: 'figure',
            properties: { className: ['md-media', 'md-media--video'] },
            children: [
              {
                type: 'element',
                tagName: 'video',
                properties: {
                  src,
                  controls: true,
                  preload: 'metadata',
                  className: ['md-media__video']
                },
                children: []
              },
              ...(alt
                ? [
                    {
                      type: 'element' as const,
                      tagName: 'figcaption',
                      properties: {},
                      children: [{ type: 'text' as const, value: alt }]
                    }
                  ]
                : [])
            ]
          };
          return;
        }

        parent.children[index] = {
          type: 'element',
          tagName: 'figure',
          properties: { className: ['md-media', 'md-media--image'] },
          children: [
            node,
            ...(alt
              ? [
                  {
                    type: 'element' as const,
                    tagName: 'figcaption',
                    properties: {},
                    children: [{ type: 'text' as const, value: alt }]
                  }
                ]
              : [])
          ]
        };
        return;
      }

      if (node.tagName === 'a') {
        const href = getStringProp(node.properties, 'href');
        if (!href) return;

        const youtube = href.match(YOUTUBE);
        if (youtube) {
          const id = youtube[1];
          parent.children[index] = {
            type: 'element',
            tagName: 'figure',
            properties: { className: ['md-media', 'md-media--embed'] },
            children: [
              {
                type: 'element',
                tagName: 'iframe',
                properties: {
                  src: `https://www.youtube-nocookie.com/embed/${id}`,
                  title: 'YouTube video',
                  loading: 'lazy',
                  allow:
                    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                  allowFullScreen: true,
                  className: ['md-media__iframe'],
                  style: 'width:100%;aspect-ratio:16/9;border:0;border-radius:var(--radius)'
                },
                children: []
              }
            ]
          };
          return;
        }
      }

      if (node.tagName === 'table' && isElement(parent) && parent.tagName !== 'div') {
        parent.children[index] = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['typeset-scroll'] },
          children: [node]
        };
      }
    });
  };
}
