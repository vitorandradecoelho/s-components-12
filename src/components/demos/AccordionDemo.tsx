import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
//import { CheckBox } from "@vitorandradecoelho/sd-components";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AccordionDemo = () => {
  const { t } = useLanguage();
  const [checkboxValue, setCheckboxValue] = React.useState(false);

  return (
    
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 border-card-border">
            {t('component.accordion.title')}
            <Badge>{t('common.basic')}</Badge>
            </CardTitle>
            <CardDescription>
            {t('component.accordion.title.description')}
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="mx-auto max-w-3xl">
        

                <div className="rounded-lg border border-border bg-card p-6 shadow-lg">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b border-border">
                      <AccordionTrigger className="text-lg font-semibold hover:text-custom-green hover:no-underline">
                        {t('component.accordion.question1')}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                       {t('component.accordion.response1')}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-b border-border">
                      <AccordionTrigger className="text-lg font-semibold hover:text-custom-green hover:no-underline">
                         {t('component.accordion.question2')}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                         {t('component.accordion.response2')}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-b border-border">
                      <AccordionTrigger className="text-lg font-semibold hover:text-custom-green hover:no-underline">
                         {t('component.accordion.question3')}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                         {t('component.accordion.response3')}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>
  );
};















































