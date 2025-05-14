import * as React from "react";
import { Stack, Text, IStackTokens } from "@fluentui/react";
import { CardWide } from "../../components/CardWide/CardWide";

const stackTokens: IStackTokens = { childrenGap: 20 };

export const CardWideExample: React.FunctionComponent = () => {
  const defaultProps = {
    image:
      "https://cdn.builder.io/api/v1/image/assets/375626aef9734fa5a388227cc2b6eab1/94060da584c09930fe9617be7b672dd31c7f11b6?placeholderIfAbsent=true",
    titleText: "Sample Title",
    bodyText: "This is a sample body text that demonstrates the card content.",
    buttonText: "Create a Passkey",
  };

  return (
    <Stack tokens={stackTokens}>
      <Stack.Item>
        <Text variant="xLarge">Default CardWide (Right Image)</Text>
        <CardWide {...defaultProps} />
      </Stack.Item>

      <Stack.Item>
        <Text variant="xLarge">CardWide with Left Image</Text>
        <CardWide {...defaultProps} imagePosition="left" />
      </Stack.Item>

      <Stack.Item>
        <Text variant="xLarge">CardWide without Bar Icon</Text>
        <CardWide {...defaultProps} showBarIcon={false} />
      </Stack.Item>

      <Stack.Item>
        <Text variant="xLarge">CardWide without Button</Text>
        <CardWide {...defaultProps} showButton={false} />
      </Stack.Item>

      <Stack.Item>
        <Text variant="xLarge">CardWide with Custom Content</Text>
        <CardWide
          {...defaultProps}
          titleText="Custom Title"
          bodyText="This is a custom body text with different content."
          buttonText="Custom Button Text"
        />
      </Stack.Item>

      <Stack.Item>
        <Text variant="xLarge">Implementation Example</Text>
        <Text>Import and use the CardWide component like this:</Text>
        <pre>
          {`
import { CardWide } from './components/CardWide/CardWide';

// Basic usage (image on right by default)
<CardWide
  showBarIcon={true}
  showButton={true}
  image="path/to/image.png"
  titleText="Your Title"
  bodyText="Your body text"
  buttonText="Button Text"
/>

// With left-aligned image
<CardWide
  image="path/to/image.png"
  titleText="Your Title"
  bodyText="Your body text"
  imagePosition="left"
/>

// Without bar icon
<CardWide
  showBarIcon={false}
  image="path/to/image.png"
  titleText="Your Title"
  bodyText="Your body text"
/>
          `}
        </pre>
      </Stack.Item>
    </Stack>
  );
};
