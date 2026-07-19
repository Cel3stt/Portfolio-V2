import React from "react";
import { Button } from "@/components/ui/button";
import PageHeading from "@/components/sections/page-heading";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CONTACTS_QUERY,
  type ContactsData,
  type ContactLink,
} from "@/sanity/queries/sections";

export default async function ContactsPage() {
  const { data } = await sanityFetch({ query: CONTACTS_QUERY });
  const contacts = data as ContactsData;
  const links = contacts?.contacts ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <PageHeading title="Contacts" subtitle="Let's Connect!" />

      {links.length === 0 ? (
        <p className="text-sm text-neutral-600">No contacts added yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {links.map((contact: ContactLink) => (
            <Button
              asChild
              variant={"outline"}
              key={contact._key}
              className="text-xs py-1"
            >
              <a
                href={contact.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.contactType}
              </a>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
