import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Select,
  Input,
  Space,
  Card,
  Tooltip,
  Row,
  Col
} from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import CodeEditor from "@uiw/react-textarea-code-editor";

const { TextArea } = Input;

function Block({ block, pageId, onDelete, onEdit, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [draft, setDraft] = useState(block.content);
function handleSave() {
  onEdit(pageId, { ...block, content: draft });
  setIsEditing(false);
}


  function confirmDelete() {
    Modal.confirm({
      title: "Delete block?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      onOk: () => onDelete(pageId, block.orderIndex),
    });
  }
if (isEditing) {
  return (
    <Card size="small" style={{ marginBottom: 12 }}>
      <Row gutter={16}>
        {/* Editor */}
        <Col span={12}>
          <CodeEditor
            value={draft}
            language="markdown"
            padding={12}
            onChange={(e) => setDraft(e.target.value)}
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 14,
              lineHeight: 1.6,
              backgroundColor: "#f9fafb",
              borderRadius: 6,
            }}
          />
        </Col>

        {/* Live preview */}
        <Col span={12}>
          <div className="markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {draft || "*Nothing to preview*"}
            </ReactMarkdown>
          </div>
        </Col>
      </Row>

      <Space style={{ marginTop: 12 }}>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
        <Button onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </Space>
    </Card>
  );
}

  return (
    <Card size="small" style={{ marginBottom: 12 }}>
      {/* Block content */}
      {block.type === "TEXT" && (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {block.content}
        </ReactMarkdown>
      )}
      {block.type === "CODE" && (
        <pre>
          <code>{block.content}</code>
        </pre>
      )}

      {/* Actions */}
      <Space>
        <Tooltip title="Move up">
          <Button
            icon={<ArrowUpOutlined />}
            onClick={() => onUpdate(pageId, block, "Up")}
          />
        </Tooltip>

        <Tooltip title="Move down">
          <Button
            icon={<ArrowDownOutlined />}
            onClick={() => onUpdate(pageId, block, "Down")}
          />
        </Tooltip>

        <Button icon={<EditOutlined />} onClick={() => {
                    setDraft(block.content);
          setIsEditing(true);
                  }}>
          Edit
        </Button>

        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={confirmDelete}
        >
          Delete
        </Button>
      </Space>

    </Card>
  );
}

export default Block;
