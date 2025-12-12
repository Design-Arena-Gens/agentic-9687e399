"use client";

import { useState } from "react";
import { workflow } from "@/data/workflow";
import { scoringSnippet, digestSnippet } from "@/lib/code-snippets";
import { FiCheckCircle, FiCopy } from "react-icons/fi";

const instructions = [
  {
    title: "Create Google Cloud project & enable YouTube API",
    details: [
      "Visit console.cloud.google.com, create a new project called “TikTok Wattpad Pipeline”.",
      "Enable YouTube Data API v3, create an API key, and restrict it to the Pabbly Connect IP ranges as needed."
    ]
  },
  {
    title: "Prepare Google Workspace connectors",
    details: [
      "Create a Google Drive folder named “TikTok Wattpad Pipeline” and share it with link access.",
      "Create a Google Sheet (same name) with a tab called `Queue` containing the header row described below.",
      "Create a separate Google Calendar titled “TikTok Posting Calendar”."
    ]
  },
  {
    title: "Build the Pabbly connect workflow",
    details: [
      "Add the Scheduler trigger (Advanced > Specific Times) with 09:00, 13:00, 18:00 EST entries.",
      "Insert “API by Pabbly” steps for YouTube search and statistics (see configuration tables).",
      "Normalize line items, then drop in the JavaScript code block to curate top videos.",
      "Attach an Iterator after the code output and wire the stream fetch, download, Drive, Calendar, and Sheets actions.",
      "Finish with the digest code step and Gmail (or Slack) notification."
    ]
  },
  {
    title: "Test & activate",
    details: [
      "Click “Save & Send Test Request” on each step using recent sample data.",
      "Verify the Drive uploads, calendar invites, and sheet rows match expectations.",
      "Switch the workflow to LIVE once validation passes."
    ]
  }
];

function CodeBlock({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-accent hover:text-white"
        >
          {copied ? (
            <>
              <FiCheckCircle className="h-4 w-4 text-emerald-400" />
              Copied
            </>
          ) : (
            <>
              <FiCopy className="h-4 w-4" />
              Copy Code
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-xl bg-slate-950/80 p-4 text-sm leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
      <section className="grid gap-6 lg:grid-cols-[3fr,2fr]">
        <div className="card space-y-6">
          <span className="inline-flex w-fit rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
            Pabbly Blueprint
          </span>
          <h1 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
            {workflow.title}
          </h1>
          <p className="text-lg text-slate-300">{workflow.narrative}</p>
          <div className="grid gap-3 text-sm text-slate-300">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Primary Goal</p>
              <p className="font-semibold text-slate-100">{workflow.goal}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Deliverables</p>
              <ul className="mt-2 space-y-2">
                {workflow.assets.map((asset) => (
                  <li key={asset.type} className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                    <p className="font-medium capitalize text-slate-100">{asset.type}</p>
                    <p className="text-xs text-slate-400">{asset.description}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Format: {asset.format} · Delivery: {asset.delivery}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-white">Tool Stack (Free)</h2>
          <ul className="space-y-4">
            {workflow.keyTools.map((tool) => (
              <li key={tool.name} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between">
                  <a href={tool.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-accent">
                    {tool.name}
                  </a>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {tool.cost.toUpperCase()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{tool.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card space-y-6">
        <h2 className="text-xl font-semibold text-white">Implementation Checklist</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {instructions.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {item.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <FiCheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-400" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-white">Workflow Modules</h2>
          <p className="text-sm text-slate-400">
            Copy the configuration values directly into Pabbly Connect. IDs reference the order used in this
            playbook.
          </p>
        </div>
        <div className="space-y-8">
          {workflow.modules.map((module) => (
            <div key={module.id} className="card space-y-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-wide text-slate-400">
                    {module.trigger ? "Trigger" : "Action"}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                </div>
                <p className="text-sm text-slate-300">{module.purpose}</p>
              </div>
              <div className="space-y-4">
                {module.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 shadow-inner shadow-black/20"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
                          Step {index + 1} · {step.id}
                        </p>
                        <h4 className="text-base font-semibold text-white">{step.title}</h4>
                      </div>
                      <div className="text-right text-xs text-slate-400">
                        <p>{step.service}</p>
                        <p className="font-semibold text-accent">{step.action}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-300">{step.description}</p>
                    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fields</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-200">
                        {step.fields.map((field) => (
                          <li key={field.label}>
                            <span className="font-semibold text-slate-100">{field.label}: </span>
                            <span className="text-slate-300">{field.value}</span>
                            {field.notes && (
                              <p className="text-xs text-slate-500">Note: {field.notes}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {step.notes && (
                      <p className="mt-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-400">
                        {step.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[3fr,2fr]">
        <div className="space-y-6">
          <CodeBlock title="Code by Pabbly · Scoring & Caption Builder" code={scoringSnippet} />
          <CodeBlock title="Code by Pabbly · Digest Formatter" code={digestSnippet} />
        </div>
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-white">Posting Schedule Blueprint</h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Timezone</p>
            <p className="text-sm font-semibold text-slate-100">{workflow.posting.timezone}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Recommended Slots</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-200">
              {workflow.posting.recommendedSlots.map((slot) => (
                <li key={slot} className="flex items-center gap-2">
                  <FiCheckCircle className="h-4 w-4 text-emerald-400" />
                  {slot}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-slate-300">{workflow.posting.rationale}</p>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Caption Framework</p>
            <p className="mt-1 text-sm text-slate-100">{workflow.captionTemplate.approach}</p>
            <p className="mt-2 text-xs text-slate-400">Prompt for AI (optional)</p>
            <p className="text-sm text-slate-200">{workflow.captionTemplate.prompt}</p>
            <ul className="mt-3 space-y-1 text-xs text-slate-400">
              {workflow.captionTemplate.structure.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Hashtag Packs</p>
            <ul className="mt-2 space-y-2">
              {workflow.hashtags.map((group) => (
                <li key={group.category}>
                  <p className="text-sm font-semibold text-slate-100">{group.category}</p>
                  <p className="text-xs text-slate-400">{group.items.join(" · ")}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-semibold text-white">Google Sheet Header Template</h2>
        <p className="text-sm text-slate-300">
          Create the `Queue` tab with the following header row so Pabbly can append rows without mapping errors:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
          <table className="min-w-full border-collapse text-xs text-slate-200">
            <thead>
              <tr className="bg-slate-900/70 text-left">
                {[
                  "Timestamp",
                  "Video Title",
                  "Channel",
                  "Publish Date",
                  "Views",
                  "Comments",
                  "Engagement Score",
                  "Caption",
                  "Hashtags",
                  "Posting Window",
                  "Start Local",
                  "End Local",
                  "Timezone",
                  "Drive Link"
                ].map((header) => (
                  <th key={header} className="border border-slate-800 px-3 py-2 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      </section>
    </main>
  );
}
