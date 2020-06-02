import { Application } from './models/application';
import { Optional, Injectable } from '@angular/core';
import { Feature } from './models/feature';

@Injectable()
export class UglaRulesService {
  private applicationAcronym: string;
  private featureAcronym: string;

  private application: Application;
  private feature: Feature;
  private operations: any[];

  constructor(@Optional() applicationAcronym: string) {
    this.applicationAcronym = applicationAcronym;
    if (!applicationAcronym) {
      console.error('Was need include an Application`s acronym!');
    }
  }

  /**
   * Create a Application object
   * @param rules is array applications returned jwt token
   */
  createRules(rules: any[]) {
    rules.forEach(item => {
      if (item.acronym === this.applicationAcronym) {
        this.application = new Application(
          item.code,
          item.acronym,
          item.name
        );
        item.features.forEach(fe => {
          const feature = new Feature(
            fe.code,
            fe.acronym,
            fe.name,
            fe.parent,
            fe.operations
          );
          this.application.features.push(feature);
        });
      }
    });
  }

  /**
   * Set feature on specific object
   * @param string - Feature's acronym
   */
  setFeature(featureAcronym: string) {
    this.featureAcronym = featureAcronym;

    if (this.application !== undefined) {
      this.application.features.forEach(item => {
        if (item.acronym === featureAcronym) {
          this.feature = item;
        }
      });

      this.setOperations(featureAcronym);
    }
  }

  private setOperations(featureAcronym: string) {
    this.operations = this.getOperations(featureAcronym);
  }

  private getOperations(featureAcronym: string) {
    let operations: [];

    this.application.features.forEach(item => {
      if (item.acronym === featureAcronym) {
        operations = item.operations;
      }
    });

    return operations;
  }

  /**
   * VIEW permission
   * @param feature – Optional Feature's acronym
   * @return - Return if has a VIEW permission
   */
  view(feature?: string): boolean {
    let operations = this.operations;

    if (!this.operations && feature === undefined) {
      console.error('VIEW operation:', 'You need inform a FEATURE\'s acronym');
    }

    if (feature !== undefined) {
      operations = this.getOperations(feature);
    }

    return operations !== undefined ? operations.find(v => v.acronym === 'VW') !== undefined : false;
  }

  /**
   * EDIT permission
   * @param feature – Optional Feature's acronym
   * @return - Return if has a EDIT permission
   */
  edit(feature?: string): boolean {
    let operations = this.operations;

    if (!this.operations && feature === undefined) {
      console.error('EDIT operation:', 'You need inform a FEATURE\'s acronym');
    }

    if (feature !== undefined) {
      operations = this.getOperations(feature);
    }

    return operations !== undefined ? operations.find(v => v.acronym === 'ED') !== undefined : false;
  }

  /**
   * CREATE permission
   * @param feature – Optional Feature's acronym
   * @returns - Return if has a CREATE permission
   */
  create(feature?: string): boolean {
    let operations = this.operations;

    if (!this.operations && feature === undefined) {
      console.error('CREATE operation:', 'You need inform a FEATURE\'s acronym');
    }

    if (feature !== undefined) {
      operations = this.getOperations(feature);
    }

    return operations !== undefined ? operations.find(v => v.acronym === 'CR') !== undefined : false;
  }

  /**
   * DELETE permission
   * @param feature – Optional Feature's acronym
   * @returns - Return if has a DELETE permission
   */
  delete(feature?: string): boolean {
    let operations = this.operations;

    if (!this.operations && feature === undefined) {
      console.error('DELETE operation:', 'You need inform a FEATURE\'s acronym');
    }

    if (feature !== undefined) {
      operations = this.getOperations(feature);
    }

    return operations !== undefined ? operations.find(v => v.acronym === 'DE') !== undefined : false;
  }
}
