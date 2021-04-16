import { Story, Meta } from '@storybook/angular/types-6-0';
import { BrandComponent } from 'projects/ugla/src';

export default {
  title: 'Example/Brand',
  component: BrandComponent
} as Meta;

const Template: Story<BrandComponent> = (args: BrandComponent) => ({
  props: args
});

export const Default = Template.bind({});
Default.args = {
  brandImage: 'https://ugla.dev/img/logo.svg',
  brandName: 'Ugla',
  path: '/'
};
