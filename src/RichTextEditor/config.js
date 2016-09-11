export default {
  text: {
    blockquote: {
      tag: 'blockquote',
      style: `
        border-left: 5px solid #EEE;
        color: #666;
        font-family: 'Hoefler Text', 'Georgia', serif;
        font-style: italic;
        margin: 16px 0px;
        padding:10px 20px;`
    }
  },
  blockStyles: [
    {label: '""', style: 'blockquote'}
  ],
  inlineStyles: [
    {label: 'B', style: 'BOLD'},
    {label: 'I', style: 'ITALIC'},
    {label: 'U', style: 'UNDERLINE'}
  ]
};
