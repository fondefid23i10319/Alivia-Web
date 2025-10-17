import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Pagination } from "swiper/modules";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ListAltIcon from "@mui/icons-material/ListAlt";

import Question from "./components/Question";

import { useAppSelector } from "../../../../../hooks/redux";
import useDialog from "../../../../../hooks/useDialog";
import { selectId } from "../../../../../features/auth/selectors";

import { getItemsOfSelfReportRequest } from "../../../../../api/clinicalQuestionnaire/get";
import { createAnswerForItemRequest } from "../../../../../api/clinicalQuestionnaire/post";
import type { AnswersState, ConfirmationsState, Item } from "./types";

interface SelfReportDialogProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  itemId: number;
  data: {
    content: number | string | null;
    confirmationAnswer: number;
    comments: string;
  };
}

function SelfReportFormDialog({ open, onClose }: SelfReportDialogProps) {
  const id = useAppSelector(selectId);
  const { showSuccess, showError } = useDialog();
  const queryClient = useQueryClient();
  const {
    data: selfReport,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["items-self-report"],
    queryFn: () => getItemsOfSelfReportRequest(),
  });
  const swiperRef = useRef<SwiperClass | null>(null);
  const [answers, setAnswers] = useState<AnswersState>({});
  const [confirmations, setConfirmations] = useState<ConfirmationsState>({});

  const createAnswerForItemMutation = useMutation<object, Error, FormValues>({
    mutationFn: ({ itemId, data }) => createAnswerForItemRequest(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items-self-report"],
      });
      queryClient.invalidateQueries({
        queryKey: ["general-info", id],
      });
      showSuccess({
        title: "Operación exitosa",
        content: "Respuesta enviada correctamente",
      });
    },
    onError: (error) => {
      showError({
        title: "Error al enviar respuesta",
        content: error.message,
      });
    },
  });

  const setAnswer = (itemId: number, value: number | string | null) =>
    setAnswers((s) => ({ ...s, [itemId]: value }));
  const setConfirmation = (itemId: number, value: number) => setConfirmations((s) => ({ ...s, [itemId]: value }));

  const isAnswered = (item: Item) => {
    if (item.requiresConfirmation) {
      const conf = confirmations[item.id];
      if (conf === undefined) return false;
      if (conf === 0) return true;
    }

    if (item.typeQuestion === "options") {
      const raw = answers[item.id];
      return raw !== undefined && raw !== null;
    }
    if (item.typeQuestion === "scale") {
      const raw = answers[item.id];
      return raw !== undefined && raw !== null;
    }
    if (item.typeQuestion === "text") {
      const txt = answers[item.id];
      return typeof txt === "string" && txt.trim().length > 0;
    }
    return false;
  };

  const submitItem = (item: Item) => {
    const answerValue = answers[item.id] ?? null;
    const confirmationValue = confirmations[item.id] ?? null;
    const comment = "";

    const body = {
      content: answerValue,
      confirmationAnswer: confirmationValue,
      comments: comment,
    };

    createAnswerForItemMutation.mutate({ itemId: item.id, data: body });
  };

  useEffect(() => {
    if (!swiperRef.current) return;
    const sw = swiperRef.current;
    const t = setTimeout(() => {
      if (typeof sw.updateAutoHeight === "function") {
        sw.updateAutoHeight();
      } else if (typeof sw.update === "function") {
        sw.update();
      }
    }, 50);
    return () => clearTimeout(t);
  }, [confirmations, answers]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center" m={0}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ListAltIcon color="primary" sx={{ fontSize: 28 }} />
          <Stack direction="column" spacing={0.5}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Autorreporte Diario
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Completa tu autoreporte diario para ayudarnos a monitorear tu progreso.
            </Typography>
          </Stack>
        </Stack>
        <IconButton
          sx={{
            "&:hover": {
              borderRadius: "50%",
              backgroundColor: "#3D3D3D33",
            },
            color: "#3D3D3D",
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: 0,
          width: "100%",
        }}
        dividers
      >
        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          pagination={{ type: "fraction" }}
          keyboard={{
            enabled: true,
          }}
          navigation={true}
          modules={[Keyboard, Navigation, Pagination]}
          autoHeight={true}
          observer={true}
          observeParents={true}
          style={{ width: "100%" }}
        >
          {selfReport.items.map((item: Item, index: number) => (
            <SwiperSlide key={index}>
              <div className="swiper-no-swiping">
                <Question
                  item={item}
                  value={answers[item.id] ?? null}
                  confirmationValue={confirmations[item.id] ?? null}
                  onAnswer={(val) => setAnswer(item.id, val)}
                  onConfirm={(val) => setConfirmation(item.id, val)}
                  onSubmit={() => submitItem(item)}
                  isAnswered={() => isAnswered(item)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
}

export default SelfReportFormDialog;
