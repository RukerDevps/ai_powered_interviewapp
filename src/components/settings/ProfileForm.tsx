"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit2, Check, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfileAction } from "@/actions/profile";

export interface ProfileFormProps {
  initialName: string;
  email: string;
  memberSince: string;
  accountType: string;
  avatar?: string | null;
}

export function ProfileForm({
  initialName,
  email,
  memberSince,
  accountType,
  avatar,
}: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [name, setName] = useState(initialName);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveStatus("saving");
    setStatusMessage(null);

    const formData = new FormData();
    formData.set("name", name);

    const result = await updateProfileAction(formData);

    if (result.success) {
      setSaveStatus("saved");
      setIsEditing(false);
      setTimeout(() => setSaveStatus("idle"), 3000);
    } else {
      setSaveStatus("error");
      setStatusMessage(result.error);
    }
  };

  const handleCancel = () => {
    setName(initialName);
    setIsEditing(false);
    setSaveStatus("idle");
    setStatusMessage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
      {/* Header section with Edit Profile button */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="space-y-0.5">
          <h3 className="text-[18px] font-semibold leading-7 text-text-primary">Profile Information</h3>
          <p className="text-sm font-medium text-text-secondary">
            Update your personal details and profile.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
          className="h-9 rounded-lg border-accent/20 text-accent font-semibold flex items-center gap-1.5 hover:bg-accent-lighter/50"
        >
          <Edit2 className="h-3.5 w-3.5" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground overflow-hidden">
          {avatar ? (
            <Image
              src={avatar}
              alt={name || email}
              width={64}
              height={64}
              unoptimized
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <User className="h-7 w-7" />
          )}
        </span>
        <div>
          <p className="text-sm font-semibold text-text-primary">Profile Picture</p>
          <p className="text-xs text-text-secondary">Avatar is managed through your account provider.</p>
        </div>
      </div>

      {/* Profile Form Grid */}
      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-text-dark">Full Name</label>
            <Input
              id="name"
              name="name"
              type="text"
              value={name}
              disabled={!isEditing}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl bg-surface border-border focus:border-accent disabled:bg-surface-secondary/50 disabled:text-text-secondary disabled:border-border/60 font-semibold"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-text-dark">Email Address</label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled
              readOnly
              className="h-12 rounded-xl bg-surface-secondary/50 border-border/60 text-text-secondary font-semibold cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Member Since (Read-only) */}
          <div className="space-y-2">
            <label htmlFor="memberSince" className="block text-sm font-medium text-text-dark">Member Since</label>
            <Input
              id="memberSince"
              type="text"
              value={memberSince}
              disabled
              readOnly
              className="h-12 rounded-xl bg-surface-secondary/50 border-border/60 text-text-secondary font-semibold cursor-not-allowed"
            />
          </div>

          {/* Account Type (Read-only) */}
          <div className="space-y-2">
            <label htmlFor="accountType" className="block text-sm font-medium text-text-dark">Account Type</label>
            <Input
              id="accountType"
              type="text"
              value={accountType}
              disabled
              readOnly
              className="h-12 rounded-xl bg-surface-secondary/50 border-border/60 text-text-secondary font-semibold cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Footer Submit Buttons and Status */}
      <div className="border-t border-border/50 pt-5 flex items-center justify-between">
        <div>
          {saveStatus === "saved" && (
            <div className="flex items-center gap-1.5 text-success text-sm font-semibold animate-in fade-in duration-300">
              <Check className="h-4 w-4" />
              Settings saved successfully!
            </div>
          )}
          {saveStatus === "error" && statusMessage && (
            <div className="text-error text-sm font-semibold animate-in fade-in duration-300">
              {statusMessage}
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={!isEditing || saveStatus === "saving"}
          className="h-11 bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-6 rounded-lg disabled:opacity-50"
        >
          {saveStatus === "saving" ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
