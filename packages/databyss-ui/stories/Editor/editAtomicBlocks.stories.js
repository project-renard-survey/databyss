import React, { useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { View, Button, Text, Grid } from '@databyss-org/ui/primitives'
import EditorProvider, {
  useEditorContext,
} from '@databyss-org/ui/editor/EditorProvider'
import PageProvider, {
  usePageContext,
} from '@databyss-org/services/pages/PageProvider'
import ValueListProvider, {
  ValueListItem,
} from '@databyss-org/ui/components/ValueList/ValueListProvider'
import {
  default as sourceReducer,
  initialState as sourceInitialState,
} from '@databyss-org/services/sources/reducer'
import SourceProvider, {
  useSourceContext,
  withSource,
} from '@databyss-org/services/sources/SourceProvider'
import {
  loadPage,
  savePage,
  seedPage,
  getPages,
} from '@databyss-org/services/pages/actions'
import { initialState } from '@databyss-org/services/pages/reducer'

import SlateContentEditable from '@databyss-org/ui/editor/slate/page/ContentEditable'
import slateReducer from '@databyss-org/ui/editor/slate/page/reducer'
import reducer from '@databyss-org/ui/editor/state/page/reducer'
import EditorPage from '@databyss-org/ui/editor/EditorPage'
import AutoSave from '@databyss-org/ui/editor/AutoSave'
import seedState from './_seedState'
import { ViewportDecorator } from '../decorators'

const Box = ({ children }) => (
  <View borderVariant="thinDark" paddingVariant="tiny" width="100%">
    {children}
  </View>
)

const EditorLoader = ({ children }) => {
  const [state, dispatch] = usePageContext()
  useEffect(
    () => {
      dispatch(getPages())
    },
    [dispatch]
  )

  const pages = state.pages.map(p => (
    <View key={p._id}>
      <Button onPress={() => dispatch(loadPage(p._id))}>
        <Text>load page {p._id}</Text>
      </Button>
    </View>
  ))

  return state.isLoading ? (
    <View mb="medium">
      <View>
        <Button onPress={() => dispatch(seedPage(seedState))}>SEED</Button>
      </View>
      {pages}
      <Text> is Loading </Text>
    </View>
  ) : (
    <EditorProvider
      initialState={state.pageState}
      editableReducer={slateReducer}
      reducer={reducer}
    >
      <AutoSave />
      {children}
    </EditorProvider>
  )
}

const ProviderDecorator = storyFn => (
  <PageProvider initialState={initialState}>
    <SourceProvider initialState={sourceInitialState} reducer={sourceReducer}>
      <EditorLoader>{storyFn()}</EditorLoader>
    </SourceProvider>
  </PageProvider>
)

storiesOf('Services|Atomic Blocks', module)
  .addDecorator(ProviderDecorator)
  .addDecorator(ViewportDecorator)
  .add('Edit Atomic Blocks', () => (
    <View>
      <Box>
        <EditorPage>
          <SlateContentEditable />
        </EditorPage>
      </Box>
    </View>
  ))
