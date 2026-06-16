"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import {
  BriefcaseBusiness,
  ChartColumn,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  FileBadge2,
  FileText,
  Info,
  ListChecks,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type FieldTone = "accent" | "success" | "warning" | "info";
type SectionId = "technical" | "behavioral" | "system-design" | "coding";

interface SelectOption {
  label: string;
  value: string;
}

type SkillOption = SelectOption;

interface SetupFieldProps {
  label: string;
  value?: string;
  icon: ComponentType<{ className?: string }>;
  tone?: FieldTone;
  options?: SelectOption[];
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  chips?: string[];
  skillOptions?: SkillOption[];
  onSkillToggle?: (value: string) => void;
  onSkillRemove?: (value: string) => void;
}

interface ContextCardProps {
  title: string;
  description: string;
  buttonLabel: string;
  activeLabel: string;
  inactiveLabel: string;
  icon: ComponentType<{ className?: string }>;
  tone?: FieldTone;
  isAdded: boolean;
  onToggle: () => void;
}

interface SectionOptionProps {
  id: SectionId;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  tone?: FieldTone;
  checked?: boolean;
  onToggle: (id: SectionId) => void;
}

interface SummaryItem {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  tone?: FieldTone;
}

interface SectionDefinition {
  id: SectionId;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  tone?: FieldTone;
}

const toneStyles: Record<FieldTone, string> = {
  accent: "bg-accent-lighter text-accent",
  success: "bg-success-lightest text-success-foreground",
  warning: "bg-warning-light text-warning-foreground",
  info: "bg-info-lightest text-info-foreground",
};

const iconSizes = "h-4 w-4";

const roleOptions: SelectOption[] = [
  { label: "Frontend Developer", value: "Frontend Developer" },
  { label: "React Developer", value: "React Developer" },
  { label: "Full Stack Developer", value: "Full Stack Developer" },
  { label: "UI Engineer", value: "UI Engineer" },
];

const experienceOptions: SelectOption[] = [
  { label: "Junior (0-2 years)", value: "Junior (0-2 years)" },
  { label: "Mid Level (2-5 years)", value: "Mid Level (2-5 years)" },
  { label: "Senior (5+ years)", value: "Senior (5+ years)" },
];

const interviewTypeOptions: SelectOption[] = [
  { label: "Technical", value: "Technical" },
  { label: "Behavioral", value: "Behavioral" },
  { label: "Mixed", value: "Mixed" },
];

const skillOptions: SkillOption[] = [
  { label: "React", value: "React" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "CSS", value: "CSS" },
  { label: "Next.js", value: "Next.js" },
  { label: "Tailwind", value: "Tailwind" },
];

const questionFocusOptions: SelectOption[] = [
  {
    label: "Mix of Conceptual, Practical, and Problem Solving",
    value: "Mix of Conceptual, Practical, and Problem Solving",
  },
  { label: "Mostly Practical and Real-World", value: "Mostly Practical and Real-World" },
  { label: "Concepts and Fundamentals", value: "Concepts and Fundamentals" },
  { label: "Problem Solving Intensive", value: "Problem Solving Intensive" },
];

const durationOptions: SelectOption[] = [
  { label: "15 Minutes", value: "15 Minutes" },
  { label: "30 Minutes", value: "30 Minutes" },
  { label: "45 Minutes", value: "45 Minutes" },
  { label: "60 Minutes", value: "60 Minutes" },
];

const questionCountOptions: SelectOption[] = [
  { label: "5 - 7 Questions", value: "5 - 7 Questions" },
  { label: "8 - 10 Questions", value: "8 - 10 Questions" },
  { label: "10 - 12 Questions", value: "10 - 12 Questions" },
  { label: "12 - 15 Questions", value: "12 - 15 Questions" },
];

const timePerQuestionOptions: SelectOption[] = [
  { label: "1 - 2 Minutes", value: "1 - 2 Minutes" },
  { label: "2 - 3 Minutes", value: "2 - 3 Minutes" },
  { label: "3 - 5 Minutes", value: "3 - 5 Minutes" },
];

const sectionDefinitions: SectionDefinition[] = [
  {
    id: "technical",
    title: "Technical Questions",
    description: "Coding, concepts, and technical knowledge",
    icon: Code2,
    tone: "accent",
  },
  {
    id: "behavioral",
    title: "Behavioral Questions",
    description: "Behavioral and situational questions",
    icon: Users,
    tone: "accent",
  },
  {
    id: "system-design",
    title: "System Design",
    description: "Architecture and system design",
    icon: MonitorSmartphone,
    tone: "info",
  },
  {
    id: "coding",
    title: "Coding Challenge",
    description: "Hands-on coding problems",
    icon: FileBadge2,
    tone: "accent",
  },
];

const SetupField = ({
  label,
  value,
  icon: Icon,
  tone = "accent",
  options,
  selectedValue,
  onValueChange,
  chips,
  skillOptions: availableSkills,
  onSkillToggle,
  onSkillRemove,
}: SetupFieldProps) => {
  const triggerContent = (
    <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors hover:bg-surface-secondary">
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          toneStyles[tone]
        )}
      >
        <Icon className={iconSizes} />
      </span>
      {chips ? (
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {chips.length > 0 ? (
            chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onSkillRemove?.(chip);
                }}
                className="inline-flex items-center gap-1 rounded-md bg-accent-light px-2 py-1 text-sm font-medium text-accent transition-colors hover:bg-accent-muted"
              >
                {chip}
                <X className="h-3.5 w-3.5" />
              </button>
            ))
          ) : (
            <span className="text-sm font-medium text-text-muted">Select primary skills</span>
          )}
        </div>
      ) : (
        <span className="min-w-0 flex-1 text-sm font-medium text-text-primary">{value}</span>
      )}
      <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
    </div>
  );

  if (options && selectedValue && onValueChange) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-dark">{label}</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-full">
              {triggerContent}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
            <DropdownMenuRadioGroup value={selectedValue} onValueChange={onValueChange}>
              {options.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  if (chips && availableSkills && onSkillToggle) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-dark">{label}</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-full">
              {triggerContent}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
            {availableSkills.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={chips.includes(option.value)}
                onCheckedChange={() => onSkillToggle(option.value)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-dark">{label}</label>
      <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 shadow-sm">
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            toneStyles[tone]
          )}
        >
          <Icon className={iconSizes} />
        </span>
        <span className="min-w-0 flex-1 text-sm font-medium text-text-primary">{value}</span>
      </div>
    </div>
  );
};

const ContextCard = ({
  title,
  description,
  buttonLabel,
  activeLabel,
  inactiveLabel,
  icon: Icon,
  tone = "accent",
  isAdded,
  onToggle,
}: ContextCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center">
        <span
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            toneStyles[tone]
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <h3 className="text-base font-semibold text-text-primary">{title}</h3>
          <p className="text-sm text-text-secondary">{description}</p>
          <p className="text-sm font-medium text-text-dark">
            {isAdded ? activeLabel : inactiveLabel}
          </p>
        </div>
        <Button variant="outline" className="h-10 px-4 text-sm font-medium" onClick={onToggle}>
          {isAdded ? `Remove ${buttonLabel}` : buttonLabel}
        </Button>
      </div>
    </div>
  );
};

const SectionOption = ({
  id,
  title,
  description,
  icon: Icon,
  tone = "accent",
  checked = false,
  onToggle,
}: SectionOptionProps) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      className={cn(
        "relative rounded-xl border bg-surface p-4 text-left shadow-sm transition-colors",
        checked
          ? "border-accent bg-accent-muted/40"
          : "border-border hover:bg-surface-secondary"
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            toneStyles[tone]
          )}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-text-primary">{title}</p>
          <p className="mt-1 text-sm leading-5 text-text-secondary">{description}</p>
        </div>
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
            checked
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border bg-surface text-transparent"
          )}
        >
          <Check className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
};

const SummaryValue = ({ item }: { item: SummaryItem }) => {
  const Icon = item.icon;

  return (
    <div className="flex items-start gap-3">
      <span
        className={cn(
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          toneStyles[item.tone ?? "accent"]
        )}
      >
        <Icon className={iconSizes} />
      </span>
      <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
        <p className="text-sm text-text-dark">{item.label}</p>
        <p className="max-w-[160px] text-right text-sm font-medium leading-6 text-text-primary">
          {item.value}
        </p>
      </div>
    </div>
  );
};

export const InterviewSetupPage = () => {
  const [selectedRole, setSelectedRole] = useState(roleOptions[0].value);
  const [selectedExperience, setSelectedExperience] = useState(experienceOptions[1].value);
  const [selectedInterviewType, setSelectedInterviewType] = useState(interviewTypeOptions[0].value);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "React",
    "JavaScript",
    "TypeScript",
    "CSS",
  ]);
  const [hasResume, setHasResume] = useState(true);
  const [hasJobDescription, setHasJobDescription] = useState(false);
  const [selectedSections, setSelectedSections] = useState<SectionId[]>([
    "technical",
    "behavioral",
  ]);
  const [selectedQuestionFocus, setSelectedQuestionFocus] = useState(questionFocusOptions[0].value);
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[1].value);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(questionCountOptions[1].value);
  const [selectedTimePerQuestion, setSelectedTimePerQuestion] = useState(
    timePerQuestionOptions[1].value
  );

  const toggleSkill = (skill: string) => {
    setSelectedSkills((currentSkills) =>
      currentSkills.includes(skill)
        ? currentSkills.filter((item) => item !== skill)
        : [...currentSkills, skill]
    );
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills((currentSkills) => currentSkills.filter((item) => item !== skill));
  };

  const toggleSection = (sectionId: SectionId) => {
    setSelectedSections((currentSections) =>
      currentSections.includes(sectionId)
        ? currentSections.filter((item) => item !== sectionId)
        : [...currentSections, sectionId]
    );
  };

  const selectedSectionLabels = sectionDefinitions
    .filter((section) => selectedSections.includes(section.id))
    .map((section) => section.title);

  const summaryItems: SummaryItem[] = [
    { label: "Role", value: selectedRole, icon: BriefcaseBusiness, tone: "accent" },
    { label: "Experience Level", value: selectedExperience, icon: ChartColumn, tone: "accent" },
    { label: "Type", value: selectedInterviewType, icon: Code2, tone: "accent" },
    { label: "Duration", value: selectedDuration, icon: Clock3, tone: "accent" },
    { label: "Questions", value: selectedQuestionCount, icon: ListChecks, tone: "accent" },
    {
      label: "Skills",
      value: selectedSkills.length > 0 ? selectedSkills.join(", ") : "Not Added",
      icon: Sparkles,
      tone: "accent",
    },
    {
      label: "Resume",
      value: hasResume ? "frontend_resume.pdf" : "Not Added",
      icon: FileBadge2,
      tone: hasResume ? "success" : "warning",
    },
    {
      label: "Job Description",
      value: hasJobDescription ? "Added" : "Not Added",
      icon: FileText,
      tone: hasJobDescription ? "success" : "warning",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-[28px] font-bold leading-9 text-text-primary">Start New Interview</h1>
        <p className="text-base text-text-secondary">
          Create a customized interview experience tailored to your needs.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
        <div className="space-y-6">
          <Card className="rounded-xl">
            <CardHeader className="space-y-3 pb-5">
              <div className="space-y-1">
                <CardTitle className="text-[18px] font-semibold leading-7 text-text-primary">
                  1. Interview Details
                </CardTitle>
                <CardDescription className="text-sm font-medium text-text-secondary">
                  Provide the basic information about the interview.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-5 pt-0 md:grid-cols-2">
              <SetupField
                label="Role / Position"
                value={selectedRole}
                icon={BriefcaseBusiness}
                options={roleOptions}
                selectedValue={selectedRole}
                onValueChange={setSelectedRole}
              />
              <SetupField
                label="Experience Level"
                value={selectedExperience}
                icon={ChartColumn}
                options={experienceOptions}
                selectedValue={selectedExperience}
                onValueChange={setSelectedExperience}
              />
              <SetupField
                label="Interview Type"
                value={selectedInterviewType}
                icon={Code2}
                options={interviewTypeOptions}
                selectedValue={selectedInterviewType}
                onValueChange={setSelectedInterviewType}
              />
              <SetupField
                label="Primary Skills (Optional)"
                icon={Sparkles}
                chips={selectedSkills}
                skillOptions={skillOptions}
                onSkillToggle={toggleSkill}
                onSkillRemove={removeSkill}
              />
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader className="space-y-3 pb-5">
              <div className="space-y-1">
                <CardTitle className="text-[18px] font-semibold leading-7 text-text-primary">
                  2. Add Context <span className="font-medium text-text-secondary">(Optional)</span>
                </CardTitle>
                <CardDescription className="text-sm font-medium text-text-secondary">
                  Add your resume or job description to customize questions better.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 pt-0 lg:grid-cols-2">
              <ContextCard
                title="Upload Resume"
                description="Upload your resume (PDF, DOCX)"
                buttonLabel="Upload Resume"
                activeLabel="frontend_resume.pdf attached"
                inactiveLabel="No resume attached"
                icon={Upload}
                tone="success"
                isAdded={hasResume}
                onToggle={() => setHasResume((current) => !current)}
              />
              <ContextCard
                title="Paste Job Description"
                description="Paste the job description or requirements"
                buttonLabel="Add Job Description"
                activeLabel="Job description added"
                inactiveLabel="No job description added"
                icon={FileText}
                tone="warning"
                isAdded={hasJobDescription}
                onToggle={() => setHasJobDescription((current) => !current)}
              />
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader className="space-y-3 pb-5">
              <div className="space-y-1">
                <CardTitle className="text-[18px] font-semibold leading-7 text-text-primary">
                  3. Customize Interview
                </CardTitle>
                <CardDescription className="text-sm font-medium text-text-secondary">
                  Choose what you want to include in your interview.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-0">
              <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
                {sectionDefinitions.map((section) => (
                  <SectionOption
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    description={section.description}
                    icon={section.icon}
                    tone={section.tone}
                    checked={selectedSections.includes(section.id)}
                    onToggle={toggleSection}
                  />
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-text-dark">Question Focus</label>
                  <Info className="h-4 w-4 text-text-secondary" />
                </div>
                <SetupField
                  label=""
                  value={selectedQuestionFocus}
                  icon={Info}
                  tone="info"
                  options={questionFocusOptions}
                  selectedValue={selectedQuestionFocus}
                  onValueChange={setSelectedQuestionFocus}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader className="space-y-3 pb-5">
              <div className="space-y-1">
                <CardTitle className="text-[18px] font-semibold leading-7 text-text-primary">
                  4. Set Interview Duration &amp; Questions
                </CardTitle>
                <CardDescription className="text-sm font-medium text-text-secondary">
                  Configure the time and number of questions.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-5 pt-0 md:grid-cols-3">
              <SetupField
                label="Total Duration"
                value={selectedDuration}
                icon={Clock3}
                options={durationOptions}
                selectedValue={selectedDuration}
                onValueChange={setSelectedDuration}
              />
              <SetupField
                label="Number of Questions"
                value={selectedQuestionCount}
                icon={ListChecks}
                options={questionCountOptions}
                selectedValue={selectedQuestionCount}
                onValueChange={setSelectedQuestionCount}
              />
              <SetupField
                label="Time per Question (Avg.)"
                value={selectedTimePerQuestion}
                icon={Clock3}
                options={timePerQuestionOptions}
                selectedValue={selectedTimePerQuestion}
                onValueChange={setSelectedTimePerQuestion}
              />
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-xl xl:sticky xl:top-6">
          <CardHeader className="space-y-3 border-b border-border pb-5">
            <div className="space-y-1">
              <CardTitle className="text-[18px] font-semibold leading-7 text-text-primary">
                Interview Summary
              </CardTitle>
              <CardDescription className="text-sm font-medium text-text-secondary">
                Review your interview settings before starting.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="space-y-4">
              {summaryItems.map((item) => (
                <SummaryValue key={item.label} item={item} />
              ))}
            </div>

            <div className="border-t border-border pt-5">
              <h3 className="text-base font-semibold text-text-primary">Included Sections</h3>
              <div className="mt-4 space-y-3">
                {sectionDefinitions.map((section) => (
                  <div key={section.id} className="flex items-center gap-3">
                    {selectedSections.includes(section.id) ? (
                      <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-success" />
                    ) : (
                      <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-text-muted">
                        <span className="h-2 w-2 rounded-full bg-text-muted" />
                      </span>
                    )}
                    <span className="text-sm font-medium text-text-dark">{section.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-border pt-5">
              <div className="rounded-xl bg-surface-secondary px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-secondary">
                  Question Focus
                </p>
                <p className="mt-2 text-sm font-medium text-text-primary">{selectedQuestionFocus}</p>
              </div>
              <div className="rounded-xl bg-surface-secondary px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-secondary">
                  Timing
                </p>
                <p className="mt-2 text-sm font-medium text-text-primary">
                  {selectedDuration} total, about {selectedTimePerQuestion} each
                </p>
              </div>
              <div className="rounded-xl bg-surface-secondary px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-secondary">
                  Coverage
                </p>
                <p className="mt-2 text-sm font-medium text-text-primary">
                  {selectedSectionLabels.length > 0
                    ? selectedSectionLabels.join(", ")
                    : "No sections selected"}
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <Button className="h-12 w-full justify-center rounded-lg text-base font-semibold">
                Start Interview
              </Button>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-text-secondary">
                <ShieldCheck className="h-4 w-4 text-text-secondary" />
                <span>Your interview is private and secure</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
