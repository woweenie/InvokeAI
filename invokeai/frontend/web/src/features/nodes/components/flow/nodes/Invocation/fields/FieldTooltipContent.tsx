import { Flex } from '@chakra-ui/react';
import { InvText } from 'common/components/InvText/wrapper';
import { useFieldInstance } from 'features/nodes/hooks/useFieldData';
import { useFieldTemplate } from 'features/nodes/hooks/useFieldTemplate';
import { useFieldTypeName } from 'features/nodes/hooks/usePrettyFieldType';
import {
  isFieldInputInstance,
  isFieldInputTemplate,
} from 'features/nodes/types/field';
import { startCase } from 'lodash-es';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
interface Props {
  nodeId: string;
  fieldName: string;
  kind: 'input' | 'output';
}

const FieldTooltipContent = ({ nodeId, fieldName, kind }: Props) => {
  const field = useFieldInstance(nodeId, fieldName);
  const fieldTemplate = useFieldTemplate(nodeId, fieldName, kind);
  const isInputTemplate = isFieldInputTemplate(fieldTemplate);
  const fieldTypeName = useFieldTypeName(fieldTemplate?.type);
  const { t } = useTranslation();
  const fieldTitle = useMemo(() => {
    if (isFieldInputInstance(field)) {
      if (field.label && fieldTemplate?.title) {
        return `${field.label} (${fieldTemplate.title})`;
      }

      if (field.label && !fieldTemplate) {
        return field.label;
      }

      if (!field.label && fieldTemplate) {
        return fieldTemplate.title;
      }

      return t('nodes.unknownField');
    } else {
      return fieldTemplate?.title || t('nodes.unknownField');
    }
  }, [field, fieldTemplate, t]);

  return (
    <Flex sx={{ flexDir: 'column' }}>
      <InvText sx={{ fontWeight: 'semibold' }}>{fieldTitle}</InvText>
      {fieldTemplate && (
        <InvText sx={{ opacity: 0.7, fontStyle: 'oblique 5deg' }}>
          {fieldTemplate.description}
        </InvText>
      )}
      {fieldTypeName && (
        <InvText>
          {t('parameters.type')}: {fieldTypeName}
        </InvText>
      )}
      {isInputTemplate && (
        <InvText>
          {t('common.input')}: {startCase(fieldTemplate.input)}
        </InvText>
      )}
    </Flex>
  );
};

export default memo(FieldTooltipContent);
