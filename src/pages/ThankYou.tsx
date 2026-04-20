import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft } from "lucide-react";

const ThankYou = () => {
  return (
    <>
      <Helmet>
        <title>Thanks — Tap Movie Engine</title>
        <meta name="description" content="Thanks for submitting your AI video to the Tap Movie Engine." />
      </Helmet>
      <main className="min-h-screen bg-hero flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex w-16 h-16 rounded-full bg-primary/20 items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Got it.</h1>
          <p className="text-lg text-muted-foreground">
            Your clip is in the queue. If it makes the cut, it'll go up on X with full credit to you. Thanks for sending it in.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Back home
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export default ThankYou;
