import { Form, Select, Input } from "antd";
import { createPage } from "../../api/pages";

const { TextArea } = Input;

function AddPageForm({ wikiId, onPageAdded, form }) {
  async function handleFinish(topic) {
    const newPage = await createPage(wikiId, topic);
    onPageAdded(newPage);
    form.resetFields();
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >

      <Form.Item
        label="Content"
        name="content"
        rules={[
          { required: true, message: "Content cannot be empty" },
        ]}
      >
        <TextArea
          rows={
           3
          }
        />
      </Form.Item>
    </Form>
  );
}

export default AddPageForm;
