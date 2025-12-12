import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { workflow } from "../src/data/workflow.ts";
import { scoringSnippet, digestSnippet } from "../src/lib/code-snippets.ts";

const outputDir = resolve(process.cwd(), "out");
mkdirSync(outputDir, { recursive: true });

const blueprintPath = resolve(outputDir, "workflow-blueprint.json");
const markdownPath = resolve(outputDir, "workflow-playbook.md");

const jsonPayload = {
  generatedAt: new Date().toISOString(),
  workflow,
  codeSnippets: {
    scoring: scoringSnippet,
    digest: digestSnippet
  }
};

const markdown = `# TikTok Wattpad Imagines Automation Blueprint

## Overview
- **Goal:** ${workflow.goal}
- **Narrative:** ${workflow.narrative}
- **Posting Timezone:** ${workflow.posting.timezone}
- **Recommended Slots:** ${workflow.posting.recommendedSlots.join(", ")}

## Tool Stack
${workflow.keyTools
  .map((tool) => `- [${tool.name}](${tool.url}) — ${tool.description} _(Cost: ${tool.cost})_`)
  .join("\n")}

## Modules
${workflow.modules
  .map((module, idx) => {
    const steps = module.steps
      .map(
        (step, stepIdx) => `  ${idx + 1}.${stepIdx + 1}. **${step.title}** (${step.service} → ${
          step.action
        })  
      ${step.description}
      ${step.fields.map((field) => `      - ${field.label}: \`${field.value}\``).join("\n")}${
          step.notes ? `\n      - _Note:_ ${step.notes}` : ""
        }`
      )
      .join("\n\n");
    return `### ${idx + 1}. ${module.title}
${module.purpose}

${steps}`;
  })
  .join("\n\n")}

## Code Snippet · Scoring & Caption Builder
\`\`\`javascript
${scoringSnippet}
\`\`\`

## Code Snippet · Digest Formatter
\`\`\`javascript
${digestSnippet}
\`\`\`
`;

writeFileSync(blueprintPath, JSON.stringify(jsonPayload, null, 2));
writeFileSync(markdownPath, markdown);

console.log(`Workflow assets generated:
- ${blueprintPath}
- ${markdownPath}`);
