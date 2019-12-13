import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { View, Grid } from '@databyss-org/ui/primitives'
import { ViewportDecorator } from '@databyss-org/ui/stories/decorators'
import NavigationProvider from '@databyss-org/ui/components/Navigation/NavigationProvider/NavigationProvider'
import { modalDict } from '@databyss-org/ui/components/Navigation/NavigationProvider/modalDict'
import SourceProvider from '@databyss-org/services/sources/SourceProvider'
import fetchMock from 'fetch-mock'

import sourceReducer, {
  initialState as sourceInitialState,
} from '@databyss-org/services/sources/reducer'
import EditorProvider, { useEditorContext } from '../../EditorProvider'
import EditorPage from '../../EditorPage'
import ContentEditable from '../page/ContentEditable'
import reducer, { getRawHtmlForBlock } from '../../state/page/reducer'
import initialState from '../../state/__tests__/initialState'
import emptyInitialState from '../../state/__tests__/emptyInitialState'
import slateReducer from '../page/reducer'

const Box = ({ children, ...others }) => (
  <View borderVariant="thinDark" paddingVariant="tiny" width="100%" {...others}>
    {children}
  </View>
)

const EditableTest = () => {
  const [slateDocument, setSlateDocument] = useState({})
  const [editorState] = useEditorContext()
  const { activeBlockId, page, blocks } = editorState

  const editorDocument = {
    activeBlockId,
    pageBlocks: page.blocks.map(block => ({
      ...blocks[block._id],
      textValue: getRawHtmlForBlock(editorState, blocks[block._id]),
    })),
  }

  return (
    <Grid>
      <Box mb="medium" pt="medium" maxWidth="500px" flexShrink={1}>
        <EditorPage>
          <ContentEditable onDocumentChange={setSlateDocument} />
        </EditorPage>
      </Box>
      <Box id="slateDocument" overflow="scroll" maxWidth="500px" flexShrink={1}>
        <pre>{JSON.stringify(slateDocument, null, 2)}</pre>
      </Box>
      <Box id="pageBlocks" overflow="scroll" maxWidth="500px" flexShrink={1}>
        <pre>{JSON.stringify(editorDocument, null, 2)}</pre>
      </Box>
    </Grid>
  )
}

storiesOf('Editor//Tests', module)
  .addDecorator(ViewportDecorator)
  .add('Slate', () => (
    <SourceProvider initialState={sourceInitialState} reducer={sourceReducer}>
      <NavigationProvider modalDict={modalDict}>
        <EditorProvider
          initialState={initialState}
          editableReducer={slateReducer}
          reducer={reducer}
        >
          <EditableTest />
        </EditorProvider>
      </NavigationProvider>
    </SourceProvider>
  ))
  .add('Slate - Empty', () => {
    let data = {}
    fetchMock
      .restore()
      // .getOnce((url, opt) => {
      //   console.log(url)
      //   console.log(opt)
      //   return true
      // }, 200)
      .post((url, opt) => {
        if (url === 'http://localhost:5000/api/sources') {
          data = JSON.parse(opt.body).data
          return true
        }

        // console.log(url)
        // console.log(data)
      }, 200)
    // .getOnce((url, { headers }) => console.log(header), 200)

    // .getOnce('http://localhost:5000/api/sources/:id', {
    //   respon se: 'responses',
    // })
    return (
      <SourceProvider initialState={sourceInitialState} reducer={sourceReducer}>
        <NavigationProvider modalDict={modalDict}>
          <EditorProvider
            initialState={emptyInitialState}
            editableReducer={slateReducer}
            reducer={reducer}
          >
            <EditableTest />
          </EditorProvider>
        </NavigationProvider>
      </SourceProvider>
    )
  })
