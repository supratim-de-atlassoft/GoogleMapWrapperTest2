import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GoogleMapWrapperTest2WebPartStrings';
import {GoogleMapWrapperTest2} from './components/GoogleMapWrapperTest2';
import { IGoogleMapWrapperTest2Props } from './components/IGoogleMapWrapperTest2Props';

export interface IGoogleMapWrapperTest2WebPartProps {
  description: string;
  
}

export default class GoogleMapWrapperTest2WebPart extends BaseClientSideWebPart<IGoogleMapWrapperTest2WebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGoogleMapWrapperTest2Props> = React.createElement(
      GoogleMapWrapperTest2,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
