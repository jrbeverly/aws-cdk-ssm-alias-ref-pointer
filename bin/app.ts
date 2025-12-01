import * as cdk from 'aws-cdk-lib';
import { SsmResolutionStack } from '../lib/ssm-resolution-stack';

const app = new cdk.App();
new SsmResolutionStack(app, 'SsmResolutionStack', {
  synthesizer: new cdk.BootstraplessSynthesizer(),
});
