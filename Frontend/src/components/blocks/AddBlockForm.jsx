import { Form, Select, Input } from "antd";
import { addBlock } from "../../api/blocks";

const { TextArea } = Input;

function AddBlockForm({ pageId, onBlockAdded, form }) {
  async function handleFinish(values) {
    const newBlock = await addBlock(pageId, values);
    onBlockAdded(newBlock);
    form.resetFields();
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{ type: "TEXT" }}
    >
      <Form.Item
        label="Block Type"
        name="type"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="TEXT">TEXT</Select.Option>
          <Select.Option value="CODE">CODE</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[
          { required: true, message: "Content cannot be empty" },
        ]}
      >
        <TextArea
          rows={
            form.getFieldValue("type") === "CODE" ? 6 : 3
          }
        />
      </Form.Item>
    </Form>
  );
}

export default AddBlockForm;
