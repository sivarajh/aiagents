## Introduction to Agents and Agent architectures

Instruct with Domain Knowledge and Persona
Within this framework, the developer's most powerful lever is to instruct the agent with
domain knowledge and a distinct persona. This is accomplished through a system prompt
or a set of core instructions. This isn't just a simple command; it is the agent's constitution.

 
Here, you tell it, You are a helpful customer support agent for Acme Corp, ...
and provide constraints, desired output schema, rules of engagement, a specific tone of
voice, and explicit guidance on when and why it should use its tools. A few example scenarios
in the instructions are usually very effective.



## Success Factors & ROI:

what are the Key Performance Indicators (KPIs) that prove the agent is delivering value? These metrics
should go beyond technical correctness and measure real-world impact: goal completion
rates, user satisfaction scores, task latency, operational cost per interaction, and—most
importantly—the impact on business goals like revenue, conversion or customer retention.
This top-down view will guide the rest of your testing, puts you on the path to metrics driven
development, and will let you calculate a return on investment


## How do you test it? 
## What is the review process?  
## LM as Judge to measure the quality with good model?
## How to create evaluation data sets? 
## Idenity the domain experts to test?

## Quality Instead of Pass/Fail: Using a LM Judge
Business metrics don't tell you if the agent is behaving correctly. Since a simple pass/fail is
impossible, we shift to evaluating for quality using an "LM as Judge." This involves using a
powerful model to assess the agent's output against a predefined rubric: Did it give the right
answer? Was the response factually grounded? Did it follow instructions? This automated
evaluation, run against a golden dataset of prompts, provides a consistent measure
of quality.
Creating the evaluation datasets—which include the ideal (or "golden") questions and correct
responses—can be a tedious process. To build these, you should sample scenarios from
existing production or development interactions with the agent. The dataset must cover the
full breadth of use cases that you expect your users to engage with, plus a few unexpected
ones. While investment in evaluation pays off quickly, evaluation results should always be 
reviewed by a domain expert before being accepted as valid. Increasingly, the curation and
maintenance of these evaluations is becoming a key responsibility for Product Managers with
the support from Domain experts.

## how to do we release the agents after the first publish?
## how to establish the trusted quality scores?
## A/B testing for the new version to slow rollout of new version to users

## Metrics-Driven Development: Your Go/No-Go for Deployment
Once you have automated dozens of evaluation scenarios and established trusted quality
scores, you can confidently test changes to your development agent. The process is simple:
run the new version against the entire evaluation dataset, and directly compare its scores
to the existing production version. This robust system eliminates guesswork, ensuring you
are confident in every deployment. While automated evaluations are critical, don't forget
other important factors like latency, cost, and task success rates. For maximum safety, use
A/B deployments to slowly roll out new versions and compare these real-world production
metrics alongside your simulation scores.

https://opentelemetry.io/blog/2025/ai-agent-observability/

export this
https://dojo.ag-ui.com/langgraph/feature/backend_tool_rendering?openCopilot=true&file=page.tsx


