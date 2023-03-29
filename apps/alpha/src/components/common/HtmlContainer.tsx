import sanitizeHtml, { Attributes, IFrame, IOptions } from 'sanitize-html';

const sanitizeOptions: IOptions = {
  allowedTags: ['div', 'font', 'br', 'span', 'tvm', 'grk', 'num'],
  allowedAttributes: false,
  transformTags: {
    td: () => {
      return {
        tagName: 'div',
        attribs: {
          class:
            'word-block bg-white hover:drop-shadow-md border border-white hover:border-orange-200 rounded cursor-pointer p-2',
        },
      };
    },
    table: () => {
      return {
        tagName: 'div',
        attribs: {
          class:
            'grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-1',
        },
      };
    },
    font: (tagName: string, attribs: Attributes) => {
      let newClass = {};
      if (attribs?.color === '#FF0000') {
        newClass = {
          class: 'text-orange-800',
        };
      } else if (attribs?.color === '#663399') {
        newClass = {
          class: 'text-gray-500 text-xs',
        };
      }
      return {
        tagName: 'font',
        attribs: {
          ...newClass,
        },
      };
    },
    span: (tagName: string, attribs: Attributes) => {
      let newClass = {};
      if (attribs?.style) {
        newClass = {
          class: 'text-violet-600',
        };
      }
      return {
        tagName: 'span',
        attribs: {
          ...newClass,
        },
      };
    },
    tvm: () => {
      return {
        tagName: 'tvm',
        attribs: {
          class: 'text-slate-400 text-xs',
        },
      };
    },
    num: () => {
      return {
        tagName: 'num',
        attribs: {
          class: 'text-slate-400 text-xs',
        },
      };
    },
    tr: 'td',
  },
  exclusiveFilter: function (frame: IFrame) {
    return (
      frame.tag === 'sub' ||
      (frame.tag === 'span' &&
        frame.text.startsWith('(') &&
        frame.text.endsWith(')'))
    );
  },
};

const sanitizeFn = (dirty: string, options: any) => {
  return {
    __html: sanitizeHtml(dirty, sanitizeOptions),
  };
};

function HtmlContainer({ html, options }: { html: any; options?: any }) {
  return <div dangerouslySetInnerHTML={sanitizeFn(html, options)} />;
}

export { HtmlContainer };
