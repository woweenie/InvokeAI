import { Box, Flex } from '@chakra-ui/react';
import { useAppDispatch } from 'app/store/storeHooks';
import { InvTextarea } from 'common/components';
import NodeCollapseButton from 'features/nodes/components/flow/nodes/common/NodeCollapseButton';
import NodeTitle from 'features/nodes/components/flow/nodes/common/NodeTitle';
import NodeWrapper from 'features/nodes/components/flow/nodes/common/NodeWrapper';
import { notesNodeValueChanged } from 'features/nodes/store/nodesSlice';
import type { NotesNodeData } from 'features/nodes/types/invocation';
import type { ChangeEvent } from 'react';
import { memo, useCallback } from 'react';
import type { NodeProps } from 'reactflow';

const NotesNode = (props: NodeProps<NotesNodeData>) => {
  const { id: nodeId, data, selected } = props;
  const { notes, isOpen } = data;
  const dispatch = useAppDispatch();
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(notesNodeValueChanged({ nodeId, value: e.target.value }));
    },
    [dispatch, nodeId]
  );

  return (
    <NodeWrapper nodeId={nodeId} selected={selected}>
      <Flex
        layerStyle="nodeHeader"
        sx={{
          borderTopRadius: 'base',
          borderBottomRadius: isOpen ? 0 : 'base',
          alignItems: 'center',
          justifyContent: 'space-between',
          h: 8,
        }}
      >
        <NodeCollapseButton nodeId={nodeId} isOpen={isOpen} />
        <NodeTitle nodeId={nodeId} title="Notes" />
        <Box minW={8} />
      </Flex>
      {isOpen && (
        <>
          <Flex
            layerStyle="nodeBody"
            className="nopan"
            sx={{
              cursor: 'auto',
              flexDirection: 'column',
              borderBottomRadius: 'base',
              w: 'full',
              h: 'full',
              p: 2,
              gap: 1,
            }}
          >
            <Flex
              className="nopan"
              sx={{ flexDir: 'column', w: 'full', h: 'full' }}
            >
              <InvTextarea
                value={notes}
                onChange={handleChange}
                rows={8}
                resize="none"
                sx={{ fontSize: 'xs' }}
              />
            </Flex>
          </Flex>
        </>
      )}
    </NodeWrapper>
  );
};

export default memo(NotesNode);
