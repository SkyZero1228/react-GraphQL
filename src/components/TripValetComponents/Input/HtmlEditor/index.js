import React, { Component } from 'react';
import { Button } from 'antd';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './index.styles.scss';

const toolbar = {
  options: ['inline', 'history'],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic'],
  },
  history: {
    options: ['undo', 'redo'],
  },
};

class HtmlEditor extends React.Component {
  constructor(props) {
    super(props);
    const html = '<p></p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  componentWillReceiveProps = nextProps => {
    console.log('cwrp', nextProps.html, this.props.html);
    if (this.props.html !== nextProps.html) {
      const html = nextProps.html;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({ editorState });
      }
    }
  };

  onEditorStateChange = editorState => {
    this.setState({ editorState });
    if (this.props.editorStateChanged) {
      this.props.editorStateChanged(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }
  };

  render() {
    const { editorState } = this.state;
    return <Editor editorState={editorState} wrapperClassName="HtmlEditor__wrapper" editorClassName="HtmlEditor__editor" onEditorStateChange={this.onEditorStateChange} toolbar={toolbar} />;
  }
}

export default HtmlEditor;
