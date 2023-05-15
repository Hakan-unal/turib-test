
import { Result } from "antd"
import { SmileOutlined } from '@ant-design/icons';


const App = () => {

  return (<Result
    icon={<SmileOutlined />}
    title="Hello World"
  // extra={<Button type="primary">Next</Button>}
  />
  )
}


export default App;