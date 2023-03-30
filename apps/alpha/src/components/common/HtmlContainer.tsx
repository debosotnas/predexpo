import sanitizeHtml, { Attributes, IFrame, IOptions } from 'sanitize-html';

const sanitizeOptions: IOptions = {
  allowedTags: ['div', 'font', 'br', 'span', 'tvm', 'grk', 'num', 'p'],
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
          class: 'flex flex-wrap gap-1 main-html-container',
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
          class: 'text-gray-500 text-xs expert-mode',
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
          class: 'text-slate-400 text-xs expert-mode',
        },
      };
    },
    p: (tagName: string, attribs: Attributes) => {
      return {
        tagName: 'p',
        attribs: {
          class: attribs?.class === 's' ? 'hidden' : attribs?.class,
        },
      };
    },
    num: () => {
      return {
        tagName: 'num',
        attribs: {
          class: 'text-slate-400 text-xs expert-mode',
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
  textFilter: function (text, tagName) {
    if (['span'].indexOf(tagName) > -1) {
      if (String(+text) === text) {
        return `<span class='inline-block mr-1 text-xs font-bold'>${text}</span>`;
      }
    }
    return text;
  },
};

const sanitizeFn = (dirty: string, options: any) => {
  return {
    __html: sanitizeHtml(dirty, sanitizeOptions),
  };
};

const preProcessFn = (html: any) => {
  return html.replaceAll('</tvm>, <tvm>', '</tvm><tvm>, </tvm><tvm>');
};
function HtmlContainer({
  html,
  options,
  className,
  preProcessHtml,
}: {
  html: any;
  options?: any;
  className?: string;
  preProcessHtml?: boolean;
}) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={sanitizeFn(
        preProcessHtml ? preProcessFn(html) : html,
        options
      )}
    />
  );
}

export { HtmlContainer };
